const mongoose = require('mongoose');
const Report = require('./models/Report');

mongoose.connect('mongodb://localhost:27017/mgnrega')
  .then(async () => {
    console.log('🔧 Fixing auto-added districts...\n');
    
    // Delete old auto-added districts (without metrics)
    const deleteResult = await Report.deleteMany({ 'raw.autoAdded': true });
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} old auto-added records\n`);
    
    // Now add a test district with proper metrics
    const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];
    const currentYear = new Date().getFullYear();
    
    const testRecords = [];
    
    for (let yearOffset = 0; yearOffset < 3; yearOffset++) {
      const year = currentYear - yearOffset;
      
      const totalJobcards = Math.floor(Math.random() * 50000) + 10000;
      const totalWorkers = Math.floor(totalJobcards * 0.7);
      const totalPersondays = Math.floor(totalWorkers * (Math.random() * 50 + 30));
      const totalExpenditure = Math.floor((totalPersondays * (Math.random() * 150 + 100)) / 100000);
      
      const metrics = months.map(month => {
        const baseValue = Math.floor(Math.random() * 5000) + 1000;
        const seasonalBoost = ['May', 'Jun', 'Jul'].includes(month) ? 1.5 : 1.0;
        return {
          month,
          value: Math.floor(baseValue * seasonalBoost)
        };
      });
      
      testRecords.push({
        state: 'Madhya Pradesh',
        district: 'Huzur Tahsil',
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
          detectedFrom: 'GPS',
          note: 'Fixed: Added metrics array'
        }
      });
    }
    
    const inserted = await Report.insertMany(testRecords);
    console.log(`✅ Added ${inserted.length} new records WITH metrics\n`);
    
    // Verify
    const verify = await Report.findOne({ 
      district: 'Huzur Tahsil', 
      year: currentYear 
    }).lean();
    
    console.log('🔍 Verification:');
    console.log(`   District: ${verify.district}`);
    console.log(`   Year: ${verify.year}`);
    console.log(`   Metrics present: ${verify.metrics ? 'YES ✅' : 'NO ❌'}`);
    console.log(`   Metrics length: ${verify.metrics?.length || 0}`);
    
    if (verify.metrics && verify.metrics.length > 0) {
      console.log(`   First metric:`, verify.metrics[0]);
      console.log(`   Sample values:`, verify.metrics.slice(0, 3).map(m => `${m.month}: ${m.value}`).join(', '));
    }
    
    console.log('\n✅ Fix complete! Charts should now work for auto-added districts.');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
