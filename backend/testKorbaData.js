const mongoose = require('mongoose');
const Report = require('./models/Report');

mongoose.connect('mongodb://localhost:27017/mgnrega')
  .then(async () => {
    console.log('Connected to MongoDB\n');
    
    // Check Korba data
    const korbaData = await Report.findOne({ district: 'Korba', year: 2025 }).lean();
    
    if (korbaData) {
      console.log('✅ Korba District - 2025 Data:');
      console.log('================================');
      console.log('📋 Total Jobcards:', korbaData.totalJobcards?.toLocaleString('en-IN') || 'MISSING');
      console.log('👷 Total Workers:', korbaData.totalWorkers?.toLocaleString('en-IN') || 'MISSING');
      console.log('🧱 Total Persondays:', korbaData.totalPersondaysGenerated?.toLocaleString('en-IN') || 'MISSING');
      console.log('💰 Total Expenditure: ₹', korbaData.totalExpenditureRs?.toLocaleString('en-IN') || 'MISSING', 'lakhs');
      console.log('📊 Monthly Metrics:', korbaData.metrics?.length || 0, 'months');
      console.log('');
      
      if (!korbaData.totalJobcards || !korbaData.totalWorkers) {
        console.log('⚠️  Stats fields are missing! Need to re-seed.');
      } else {
        console.log('✅ All stats fields present!');
      }
    } else {
      console.log('❌ No data found for Korba 2025');
    }
    
    // Count total records
    const totalRecords = await Report.countDocuments();
    console.log('\nTotal records in database:', totalRecords);
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
