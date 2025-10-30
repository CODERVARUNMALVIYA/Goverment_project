/**
 * Application constants
 */

// HTTP Status Codes
const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503
};

// Response Messages
const MESSAGES = {
  SUCCESS: 'Operation completed successfully',
  ERROR: 'An error occurred',
  NOT_FOUND: 'Resource not found',
  INVALID_REQUEST: 'Invalid request',
  DB_ERROR: 'Database error',
  SYNC_SUCCESS: 'Data sync completed successfully',
  SYNC_ERROR: 'Data sync failed'
};

// Database connection states
const DB_STATUS = {
  DISCONNECTED: 0,
  CONNECTED: 1,
  CONNECTING: 2,
  DISCONNECTING: 3
};

module.exports = {
  HTTP_STATUS,
  MESSAGES,
  DB_STATUS
};
