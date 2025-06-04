const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const locationController = require('../controllers/locationController');

// @route   POST /api/location/check-in
// @desc    Create a new location check-in
// @access  Private
router.post('/check-in', auth, locationController.checkIn);

// @route   GET /api/location/check-ins
// @desc    Get all check-ins for the current user
// @access  Private
router.get('/check-ins', auth, locationController.getCheckIns);

// @route   GET /api/location/check-ins/:id
// @desc    Get check-in by ID
// @access  Private
router.get('/check-ins/:id', auth, locationController.getCheckInById);

// @route   DELETE /api/location/check-ins/:id
// @desc    Delete a check-in
// @access  Private
router.delete('/check-ins/:id', auth, locationController.deleteCheckIn);

// @route   GET /api/location/recent
// @desc    Get most recent check-in
// @access  Private
router.get('/recent', auth, locationController.getRecentCheckIn);

// @route   GET /api/location/family/:userId
// @desc    Get check-ins for a family member (for caregivers)
// @access  Private
router.get('/family/:userId', auth, locationController.getFamilyMemberCheckIns);

module.exports = router;