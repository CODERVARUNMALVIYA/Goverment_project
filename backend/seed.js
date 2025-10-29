// Quick script to seed the database with sample data
require('dotenv').config();
const mongoose = require('mongoose');
const { seedDatabase } = require('./utils/seedData');

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mgnrega';

mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    return seedDatabase();
  })
  .then(result => {
    console.log('Seed completed successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
