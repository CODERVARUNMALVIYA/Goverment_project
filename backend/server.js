require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cron = require('node-cron');

const mgnregaRouter = require('./routes/mgnrega');
const syncService = require('./services/fetchData');

const app = express();

// Middleware setup
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

// MongoDB connection with retry logic
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mgnrega';
let retryCount = 0;
const maxRetries = 3;

function connectWithRetry() {
  mongoose.connect(mongoUri, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
  })
  .then(() => {
    console.log('✓ MongoDB connected successfully');
    retryCount = 0;
  })
  .catch(err => {
    console.error('✗ MongoDB connection error:', err.message);
    if (retryCount < maxRetries) {
      retryCount++;
      console.log(`Retrying connection (${retryCount}/${maxRetries}) in 5s...`);
      setTimeout(connectWithRetry, 5000);
    } else {
      console.error('Max retries reached. Please check MongoDB is running.');
    }
  });
}

connectWithRetry();

// API routes
app.use('/api/mgnrega', mgnregaRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  const status = mongoose.connection.readyState === 1 ? 'healthy' : 'unhealthy';
  res.json({ 
    status, 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Manual sync trigger endpoint
app.post('/api/sync', async (req, res) => {
  try {
    console.log('Manual sync triggered');
    const result = await syncService.syncAll();
    res.json({ ok: true, message: 'Sync completed', result });
  } catch (err) {
    console.error('Manual sync error:', err);
    res.status(500).json({ 
      ok: false, 
      error: 'Sync failed', 
      message: err.message,
      hint: 'Check DATA_GOV_API_URL and API_KEY in .env'
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ ok: false, error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log(`✓ API endpoints available at /api/mgnrega`);
});

// Schedule periodic sync from data.gov.in
const cronExpr = process.env.SYNC_CRON || '0 3 * * *'; // default: daily at 3 AM
const enableSync = process.env.ENABLE_AUTO_SYNC !== 'false';

if (enableSync) {
  console.log(`✓ Auto-sync scheduled: ${cronExpr}`);
  cron.schedule(cronExpr, async () => {
    console.log('\n⏰ Running scheduled data sync...');
    try {
      const result = await syncService.syncAll();
      console.log('✓ Scheduled sync successful:', result);
    } catch (err) {
      console.error('✗ Scheduled sync failed:', err.message);
    }
  });
} else {
  console.log('⚠ Auto-sync disabled (set ENABLE_AUTO_SYNC=true to enable)');
}
