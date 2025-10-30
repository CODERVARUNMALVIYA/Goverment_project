/**
 * Application configuration
 */
module.exports = {
  // Server configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // Frontend configuration
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  
  // CORS configuration
  cors: {
    origin: process.env.FRONTEND_URL || '*',
    credentials: true
  },
  
  // Sync configuration
  sync: {
    enabled: process.env.ENABLE_AUTO_SYNC !== 'false',
    cronExpression: process.env.SYNC_CRON || '0 3 * * *', // Default: daily at 3 AM
  },
  
  // API configuration
  api: {
    dataGovUrl: process.env.DATA_GOV_API_URL,
    apiKey: process.env.API_KEY,
  },
  
  // Database configuration
  database: {
    uri: process.env.MONGO_URI || 'mongodb://localhost:27017/mgnrega'
  }
};
