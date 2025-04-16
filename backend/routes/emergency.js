const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');
const auth = require('../middleware/auth');

// @route   POST /api/emergency
// @desc    Create a new emergency contact
// @access  Private
router.post('/', auth, emergencyController.createEmergencyContact);

// @route   GET /api/emergency
// @desc    Get all emergency contacts for current user
// @access  Private
router.get('/', auth, emergencyController.getEmergencyContacts);

// @route   GET /api/emergency/:id
// @desc    Get emergency contact by ID
// @access  Private
router.get('/:id', auth, emergencyController.getEmergencyContactById);

// @route   PUT /api/emergency/:id
// @desc    Update emergency contact
// @access  Private
router.put('/:id', auth, emergencyController.updateEmergencyContact);

// @route   DELETE /api/emergency/:id
// @desc    Delete emergency contact
// @access  Private
router.delete('/:id', auth, emergencyController.deleteEmergencyContact);

module.exports = router;