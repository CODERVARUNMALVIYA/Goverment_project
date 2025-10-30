/**
 * Main entry point exports
 */
const createApp = require('./app');
const config = require('./config/app');
const database = require('./config/database');

module.exports = {
  createApp,
  config,
  database
};
