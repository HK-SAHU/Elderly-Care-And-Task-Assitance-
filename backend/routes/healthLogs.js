const express = require('express');
const router = express.Router();
const healthLogController = require('../controllers/healthLogController');
const auth = require('../middleware/auth');

// @route   POST /api/health-logs
// @desc    Create a new health log entry
// @access  Private
router.post('/', auth, healthLogController.createHealthLog);

// @route   GET /api/health-logs
// @desc    Get all health logs for current user
// @access  Private
router.get('/', auth, healthLogController.getUserHealthLogs);

// @route   GET /api/health-logs/:id
// @desc    Get health log by ID
// @access  Private
router.get('/:id', auth, healthLogController.getHealthLogById);

// @route   DELETE /api/health-logs/:id
// @desc    Delete a health log
// @access  Private
router.delete('/:id', auth, healthLogController.deleteHealthLog);

module.exports = router;