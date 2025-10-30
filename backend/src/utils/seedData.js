const Report = require('../models/Report');

// Generate realistic sample MGNREGA data for testing when API is not available
const indianStates = [
  'Bihar', 'Uttar Pradesh', 'Madhya Pradesh', 'Rajasthan', 'Maharashtra',
  'West Bengal', 'Odisha', 'Jharkhand', 'Chhattisgarh', 'Andhra Pradesh'
];

const sampleDistricts = {
  'Bihar': ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur', 'Darbhanga', 'Nalanda', 'Rohtas', 'Purnia', 'Begusarai', 'Siwan'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Allahabad', 'Meerut', 'Bareilly', 'Aligarh', 'Gorakhpur', 'Noida'],
  'Madhya Pradesh': ['Bhopal', 'Indore', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Rewa', 'Satna', 'Dewas', 'Ratlam'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Alwar', 'Bhilwara', 'Sikar', 'Bharatpur'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Aurangabad', 'Thane', 'Solapur', 'Kolhapur', 'Ahmednagar', 'Satara'],
  'West Bengal': ['Kolkata', 'Howrah', 'Darjeeling', 'Murshidabad', 'Malda', 'Barddhaman', 'Nadia', 'North 24 Parganas', 'South 24 Parganas', 'Hugli'],
  'Odisha': ['Bhubaneswar', 'Cuttack', 'Puri', 'Rourkela', 'Sambalpur', 'Berhampur', 'Balasore', 'Bhadrak', 'Angul', 'Koraput'],
  'Jharkhand': ['Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Deoghar', 'Hazaribagh', 'Giridih', 'Ramgarh', 'Dumka', 'Palamu'],
  'Chhattisgarh': ['Raipur', 'Bilaspur', 'Durg', 'Korba', 'Rajnandgaon', 'Bhilai', 'Jagdalpur', 'Raigarh', 'Dhamtari', 'Mahasamund'],
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Tirupati', 'Kakinada', 'Rajahmundry', 'Kurnool', 'Anantapur', 'Kadapa']
};

const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

function generateMetrics() {
  return months.map(month => {
    // Generate values that look realistic - higher in summer months (MGNREGA peak season)
    const baseValue = Math.floor(Math.random() * 5000) + 1000;
    const seasonalBoost = ['May', 'Jun', 'Jul'].includes(month) ? 1.5 : 1.0;
    return {
      month,
      value: Math.floor(baseValue * seasonalBoost)
    };
  });
}

async function seedDatabase() {
  console.log('Starting database seeding with sample MGNREGA data...');
  
  const startTime = Date.now();
  let insertCount = 0;

  try {
    // Clear existing data (optional - comment out if you want to keep existing data)
    // await Report.deleteMany({});
    // console.log('Cleared existing data');

    const currentYear = new Date().getFullYear();
    const years = [currentYear, currentYear - 1, currentYear - 2];

    for (const state of indianStates) {
      const districts = sampleDistricts[state] || [];
      
      for (const district of districts) {
        for (const year of years) {
          // Generate realistic numbers for MGNREGA metrics
          const totalJobcards = Math.floor(Math.random() * 50000) + 10000; // 10k-60k
          const totalWorkers = Math.floor(totalJobcards * 0.7); // ~70% of jobcards
          const totalPersondays = Math.floor(totalWorkers * (Math.random() * 50 + 30)); // 30-80 days per worker
          const totalExpenditure = Math.floor((totalPersondays * (Math.random() * 150 + 100)) / 100000); // ₹100-250 per day, in lakhs
          
          const reportData = {
            state,
            district,
            year,
            totalJobcards,
            totalWorkers,
            totalPersondaysGenerated: totalPersondays,
            totalExpenditureRs: totalExpenditure,
            metrics: generateMetrics(),
            sourceUpdatedAt: new Date(),
            raw: {
              generated: true,
              note: 'Sample data for testing'
            }
          };

          await Report.updateOne(
            { state, district, year },
            { $set: reportData },
            { upsert: true }
          );
          
          insertCount++;
          
          if (insertCount % 50 === 0) {
            console.log(`Seeded ${insertCount} records...`);
          }
        }
      }
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n✓ Seeding complete!`);
    console.log(`  - Records inserted: ${insertCount}`);
    console.log(`  - Time taken: ${elapsed}s`);
    console.log(`  - States: ${indianStates.length}`);
    console.log(`  - Districts: ${Object.values(sampleDistricts).flat().length}`);
    
    return { success: true, count: insertCount };
  } catch (err) {
    console.error('Seeding failed:', err);
    throw err;
  }
}

module.exports = { seedDatabase };
