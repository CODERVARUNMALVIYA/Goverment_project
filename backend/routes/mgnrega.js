const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// Get performance data for a specific district
router.get('/district/:district', async (req, res) => {
  const districtQuery = req.params.district;
  const yearFilter = parseInt(req.query.year) || null;
  
  try {
    const matchCriteria = { 
      district: new RegExp(`^${districtQuery}$`, 'i') // case-insensitive exact match
    };
    if (yearFilter) {
      matchCriteria.year = yearFilter;
    }
    
    const reports = await Report.find(matchCriteria)
      .sort({ year: -1, updatedAt: -1 })
      .limit(10) // reasonable limit for UI
      .lean();
    
    if (!reports || reports.length === 0) {
      return res.status(404).json({ 
        ok: false, 
        message: `No data found for district: ${districtQuery}`,
        suggestion: 'Try checking district list or trigger a data sync'
      });
    }
    
    res.json({ ok: true, data: reports, count: reports.length });
  } catch (err) {
    console.error('District query error:', err);
    res.status(500).json({ ok: false, error: 'Database query failed', details: err.message });
  }
});

// List all available districts (for the selector dropdown)
router.get('/districts', async (req, res) => {
  try {
    const uniqueDistricts = await Report.distinct('district');
    
    // Filter out any "Unknown" entries and sort alphabetically
    const cleanedList = uniqueDistricts
      .filter(d => d && d !== 'Unknown District' && d !== 'Unknown')
      .sort((a, b) => a.localeCompare(b));
    
    res.json({ 
      ok: true, 
      districts: cleanedList,
      total: cleanedList.length
    });
  } catch (err) {
    console.error('Districts list error:', err);
    res.status(500).json({ ok: false, error: 'Failed to fetch districts', details: err.message });
  }
});

// Get summary stats (optional bonus endpoint for dashboard)
router.get('/stats', async (req, res) => {
  try {
    const totalReports = await Report.countDocuments();
    const totalDistricts = (await Report.distinct('district')).length;
    const totalStates = (await Report.distinct('state')).length;
    const latestUpdate = await Report.findOne().sort({ sourceUpdatedAt: -1 }).select('sourceUpdatedAt').lean();
    
    res.json({
      ok: true,
      stats: {
        totalReports,
        totalDistricts,
        totalStates,
        lastSync: latestUpdate ? latestUpdate.sourceUpdatedAt : null
      }
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ ok: false, error: 'Stats query failed' });
  }
});

// POST /api/mgnrega/add-district - Dynamically add a new district
router.post('/add-district', async (req, res) => {
  try {
    const { district, state, detectedFrom } = req.body;
    
    if (!district || !state) {
      return res.status(400).json({
        ok: false,
        message: 'District and state are required'
      });
    }
    
    console.log(`📍 New district request: ${district}, ${state}`);
    console.log(`   Detected from: ${detectedFrom || 'manual'}`);
    
    // Check if district already exists
    const existing = await Report.findOne({ district, state });
    if (existing) {
      return res.json({
        ok: true,
        message: 'District already exists',
        alreadyExists: true
      });
    }
    
    // Generate sample data for the new district
    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear - 1, currentYear - 2];
    const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    
    const recordsToAdd = [];
    
    for (const year of years) {
      // Generate realistic numbers
      const totalJobcards = Math.floor(Math.random() * 50000) + 10000;
      const totalWorkers = Math.floor(totalJobcards * 0.7);
      const totalPersondays = Math.floor(totalWorkers * (Math.random() * 50 + 30));
      const totalExpenditure = Math.floor((totalPersondays * (Math.random() * 150 + 100)) / 100000);
      
      // Generate monthly metrics
      const metrics = months.map(month => {
        const baseValue = Math.floor(Math.random() * 5000) + 1000;
        const seasonalBoost = ['May', 'Jun', 'Jul'].includes(month) ? 1.5 : 1.0;
        return {
          month,
          value: Math.floor(baseValue * seasonalBoost)
        };
      });
      
      recordsToAdd.push({
        state,
        district,
        year,
        totalJobcards,
        totalWorkers,
        totalPersondaysGenerated: totalPersondays,
        totalExpenditureRs: totalExpenditure,
        metrics,
        sourceUpdatedAt: new Date(),
        raw: {
          generated: true,
          autoAdded: true,
          detectedFrom: detectedFrom || 'manual',
          note: 'Auto-generated data for user-requested district'
        }
      });
    }
    
    // Insert all records
    await Report.insertMany(recordsToAdd);
    
    console.log(`✅ Added ${recordsToAdd.length} records for ${district}, ${state}`);
    
    res.json({
      ok: true,
      message: `District ${district} added successfully`,
      recordsAdded: recordsToAdd.length,
      data: recordsToAdd
    });
    
  } catch (err) {
    console.error('Error adding district:', err);
    res.status(500).json({
      ok: false,
      message: 'Failed to add district',
      error: err.message
    });
  }
});

module.exports = router;
