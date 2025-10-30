const express = require('express');
const router = express.Router();
const mgnregaController = require('../controllers/mgnregaController');
const { asyncHandler } = require('../middleware');

// Get performance data for a specific district
router.get('/district/:district', asyncHandler(mgnregaController.getDistrictData));

// List all available districts (for the selector dropdown)
router.get('/districts', asyncHandler(mgnregaController.getDistricts));

// Get summary stats (optional bonus endpoint for dashboard)
router.get('/stats', asyncHandler(mgnregaController.getStats));

// POST /api/mgnrega/add-district - Dynamically add a new district
router.post('/add-district', asyncHandler(mgnregaController.addDistrict));

module.exports = router;
