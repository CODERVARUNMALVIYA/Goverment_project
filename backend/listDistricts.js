const mongoose = require('mongoose');
const Report = require('./models/Report');

mongoose.connect('mongodb://localhost:27017/mgnrega')
  .then(async () => {
    const districts = await Report.distinct('district');
    console.log('📍 Total districts in database:', districts.length);
    console.log('\n🌍 Available Districts:');
    console.log('='.repeat(40));
    
    // Group by state
    const states = await Report.distinct('state');
    for (const state of states.sort()) {
      const stateDistricts = await Report.find({ state }).distinct('district');
      console.log(`\n${state}: (${stateDistricts.length} districts)`);
      stateDistricts.sort().forEach(d => console.log(`  • ${d}`));
    }
    
    console.log('\n' + '='.repeat(40));
    console.log('💡 Suggestion: Agar aapka district list mein nahi hai,');
    console.log('   toh manually search box se select karein.');
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
