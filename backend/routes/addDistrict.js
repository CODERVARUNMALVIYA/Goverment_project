const express = require('express');
const router = express.Router();
const Report = require('../models/Report');

// ... existing routes ...

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
