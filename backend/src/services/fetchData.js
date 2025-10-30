const axios = require('axios');
const Report = require('../models/Report');

// Real-world data fetcher for MGNREGA district reports
// The data.gov.in API structure isn't always consistent, so we handle multiple formats
const DATA_GOV_API_URL = process.env.DATA_GOV_API_URL || '';
const DATA_GOV_API_KEY = process.env.DATA_GOV_API_KEY || '';

// Helper: safely extract nested fields because govt APIs can be inconsistent
function safeGet(obj, path, fallback = null) {
  const keys = path.split('.');
  let current = obj;
  for (let k of keys) {
    if (current && typeof current === 'object' && k in current) {
      current = current[k];
    } else return fallback;
  }
  return current;
}

async function fetchFromUpstream(pageNum = 1) {
  if (!DATA_GOV_API_URL) {
    console.warn('API URL missing - using fallback empty dataset');
    return { records: [] };
  }

  const queryParams = {
    limit: 1000,
    offset: (pageNum - 1) * 1000
  };
  
  // Some govt APIs need api-key, others need api_key, we try both
  if (DATA_GOV_API_KEY) {
    queryParams['api-key'] = DATA_GOV_API_KEY;
    queryParams['api_key'] = DATA_GOV_API_KEY;
  }

  try {
    const resp = await axios.get(DATA_GOV_API_URL, { 
      params: queryParams, 
      timeout: 25000,
      headers: { 'User-Agent': 'MGNREGADistrictApp/1.0' }
    });
    return resp.data;
  } catch (err) {
    if (err.response && err.response.status === 429) {
      console.error('Rate limited by API - need to back off');
      throw new Error('API_RATE_LIMIT');
    }
    console.error('Fetch failed:', err.message);
    throw err;
  }
}

// Try to normalize various field naming conventions seen in govt datasets
function normalizeRecord(rec) {
  // Different possible field names we've seen in MGNREGA datasets
  const stateName = rec.state_name || rec.state || rec.STATE || rec.State || 'Unknown State';
  const districtName = rec.district_name || rec.district || rec.DISTRICT || rec.District || 'Unknown District';
  
  // Year extraction - sometimes it's in fin_year like "2024-25" or just "year"
  let yearValue = new Date().getFullYear();
  if (rec.year) {
    yearValue = parseInt(rec.year);
  } else if (rec.fin_year || rec.financial_year) {
    const finYear = rec.fin_year || rec.financial_year;
    const match = finYear.match(/(\d{4})/);
    if (match) yearValue = parseInt(match[1]);
  }

  // Metrics can be in various formats - monthly data, quarterly, or single values
  let metricsArray = [];
  if (rec.monthly_metrics && Array.isArray(rec.monthly_metrics)) {
    metricsArray = rec.monthly_metrics;
  } else if (rec.metrics && Array.isArray(rec.metrics)) {
    metricsArray = rec.metrics;
  } else {
    // Sometimes data is flat with month columns like apr_jobs, may_jobs, etc.
    const months = ['apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec', 'jan', 'feb', 'mar'];
    months.forEach(m => {
      const jobsKey = `${m}_jobs`;
      const workKey = `${m}_work_days`;
      if (rec[jobsKey] || rec[workKey]) {
        metricsArray.push({
          month: m,
          value: parseInt(rec[jobsKey] || rec[workKey] || 0)
        });
      }
    });
  }

  return { 
    state: stateName, 
    district: districtName, 
    year: yearValue, 
    metrics: metricsArray, 
    raw: rec, 
    sourceUpdatedAt: new Date() 
  };
}

async function syncAll() {
  console.log('=== Starting data sync from upstream ===');
  const startTime = Date.now();
  
  try {
    const rawData = await fetchFromUpstream(1);
    
    // API response format varies - check multiple possible locations
    let recordsList = null;
    if (rawData.records) recordsList = rawData.records;
    else if (rawData.data) recordsList = rawData.data;
    else if (rawData.results) recordsList = rawData.results;
    else if (Array.isArray(rawData)) recordsList = rawData;
    
    if (!recordsList || !Array.isArray(recordsList)) {
      console.error('Unexpected API response format:', Object.keys(rawData));
      throw new Error('Cannot find records array in API response - check DATA_GOV_API_URL');
    }

    console.log(`Found ${recordsList.length} records to process`);
    
    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    // Process in batches to avoid overwhelming DB
    const batchSize = 50;
    for (let i = 0; i < recordsList.length; i += batchSize) {
      const batch = recordsList.slice(i, i + batchSize);
      
      for (const rawRecord of batch) {
        try {
          const normalized = normalizeRecord(rawRecord);
          
          // Skip if district is still unknown after normalization
          if (normalized.district === 'Unknown District') {
            skipCount++;
            continue;
          }

          const searchCriteria = { 
            state: normalized.state, 
            district: normalized.district, 
            year: normalized.year 
          };
          
          const updateFields = { 
            $set: { 
              metrics: normalized.metrics, 
              raw: normalized.raw, 
              sourceUpdatedAt: normalized.sourceUpdatedAt 
            } 
          };
          
          const result = await Report.updateOne(searchCriteria, updateFields, { upsert: true });
          
          if (result.upsertedCount > 0 || result.modifiedCount > 0) {
            successCount++;
          }
        } catch (itemErr) {
          errorCount++;
          console.error('Failed to process record:', itemErr.message);
        }
      }
      
      // Small delay between batches to be nice to the DB
      if (i + batchSize < recordsList.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`=== Sync complete in ${elapsed}s ===`);
    console.log(`Success: ${successCount}, Skipped: ${skipCount}, Errors: ${errorCount}`);
    
    return { 
      ok: true, 
      total: recordsList.length, 
      success: successCount,
      skipped: skipCount,
      errors: errorCount,
      duration: elapsed
    };
  } catch (err) {
    console.error('=== Sync failed ===', err.message);
    if (err.message === 'API_RATE_LIMIT') {
      console.log('Will retry on next scheduled run');
    }
    throw err;
  }
}

module.exports = { fetchFromUpstream, syncAll, normalizeRecord };
