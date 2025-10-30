const syncService = require('../services/fetchData');
const database = require('../config/database');
const { HTTP_STATUS } = require('../constants');

/**
 * Health check endpoint
 */
const healthCheck = (req, res) => {
  const status = database.isConnected() ? 'healthy' : 'unhealthy';
  res.json({ 
    status, 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
};

/**
 * Manual sync trigger
 */
const triggerSync = async (req, res, next) => {
  try {
    console.log('Manual sync triggered');
    const result = await syncService.syncAll();
    res.json({ 
      ok: true, 
      message: 'Sync completed', 
      result 
    });
  } catch (err) {
    console.error('Manual sync error:', err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ 
      ok: false, 
      error: 'Sync failed', 
      message: err.message,
      hint: 'Check DATA_GOV_API_URL and API_KEY in .env'
    });
  }
};

module.exports = {
  healthCheck,
  triggerSync
};
