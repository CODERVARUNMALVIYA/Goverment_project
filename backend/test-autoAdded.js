const mongoose = require('mongoose');
const Report = require('./models/Report');

mongoose.connect('mongodb://localhost:27017/mgnrega')
  .then(async () => {
    console.log('🔍 Checking auto-added districts...\n');
    
    const recentDistricts = await Report.find({ 'raw.autoAdded': true })
      .sort({ createdAt: -1 })
      .limit(3)
      .select('district state year metrics')
      .lean();
    
    if (recentDistricts.length === 0) {
      console.log('❌ No auto-added districts found in database');
    } else {
      console.log(`✅ Found ${recentDistricts.length} auto-added district(s):\n`);
      
      recentDistricts.forEach(d => {
        console.log(`📍 ${d.district}, ${d.state} (${d.year}):`);
        console.log(`   Metrics present: ${d.metrics ? 'YES ✅' : 'NO ❌'}`);
        console.log(`   Metrics length: ${d.metrics?.length || 0}`);
        
        if (d.metrics && d.metrics.length > 0) {
          console.log(`   First metric:`, d.metrics[0]);
          console.log(`   Last metric:`, d.metrics[d.metrics.length - 1]);
        }
        console.log('');
      });
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
