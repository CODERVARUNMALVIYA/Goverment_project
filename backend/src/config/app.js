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
    origin: function(origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      const allowedOrigins = [
        process.env.FRONTEND_URL,
        'http://localhost:3000',
        'http://localhost:5000',
        'http://127.0.0.1:3000',
        'https://frontnd.onrender.com' // Add your actual production frontend URL
      ].filter(Boolean);
      
      if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
        callback(null, true);
      } else {
        console.warn(`CORS blocked request from origin: ${origin}`);
        callback(null, true); // Allow all in production for now
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
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
