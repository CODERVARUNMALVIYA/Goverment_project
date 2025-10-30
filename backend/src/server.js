require('dotenv').config();
const cron = require('node-cron');
const createApp = require('./app');
const database = require('./config/database');
const config = require('./config/app');
const syncService = require('./services/fetchData');

/**
 * Start the server
 */
const startServer = async () => {
  try {
    // Connect to database
    await database.connect();

    // Create Express app
    const app = createApp();

    // Start HTTP server
    const server = app.listen(config.port, () => {
      console.log(`✓ Server running on http://localhost:${config.port}`);
      console.log(`✓ Environment: ${config.nodeEnv}`);
      console.log(`✓ API endpoints available at /api/mgnrega`);
    });

    // Schedule periodic sync from data.gov.in
    if (config.sync.enabled) {
      console.log(`✓ Auto-sync scheduled: ${config.sync.cronExpression}`);
      cron.schedule(config.sync.cronExpression, async () => {
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

    // Graceful shutdown
    const gracefulShutdown = async (signal) => {
      console.log(`\n${signal} received. Starting graceful shutdown...`);
      
      server.close(async () => {
        console.log('HTTP server closed');
        
        try {
          await database.disconnect();
          console.log('Database connection closed');
          process.exit(0);
        } catch (err) {
          console.error('Error during shutdown:', err);
          process.exit(1);
        }
      });

      // Force shutdown after 10 seconds
      setTimeout(() => {
        console.error('Forcing shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    // Handle shutdown signals
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

// Start the server
startServer();
