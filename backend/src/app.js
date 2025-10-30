require('dotenv').config();
const express = require('express');
const cors = require('cors');
const config = require('./config/app');
const { mgnregaRoutes, systemRoutes } = require('./routes');
const { errorHandler, notFoundHandler, requestLogger } = require('./middleware');

/**
 * Create and configure Express application
 */
const createApp = () => {
  const app = express();

  // Middleware setup
  app.use(cors(config.cors));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  // Request logging (development only)
  if (config.nodeEnv === 'development') {
    app.use(requestLogger);
  }

  // API routes
  app.use('/api/mgnrega', mgnregaRoutes);
  app.use('/api', systemRoutes);

  // Root endpoint
  app.get('/', (req, res) => {
    res.json({
      message: 'MGNREGA Performance Dashboard API',
      version: '1.0.0',
      endpoints: {
        health: '/api/health',
        sync: '/api/sync',
        districts: '/api/mgnrega/districts',
        districtData: '/api/mgnrega/district/:district',
        stats: '/api/mgnrega/stats',
        addDistrict: '/api/mgnrega/add-district'
      }
    });
  });

  // Error handlers (must be last)
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};

module.exports = createApp;
