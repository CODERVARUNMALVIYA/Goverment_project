const express = require('express');
const router = express.Router();
const systemController = require('../controllers/systemController');
const { asyncHandler } = require('../middleware');

// Health check endpoint
router.get('/health', systemController.healthCheck);

// Manual sync trigger endpoint
router.post('/sync', asyncHandler(systemController.triggerSync));

module.exports = router;
