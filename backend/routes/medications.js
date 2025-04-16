const express = require('express');
const router = express.Router();
const medicationController = require('../controllers/medicationController');
const auth = require('../middleware/auth');

// @route   POST /api/medications
// @desc    Create a new medication
// @access  Private
router.post('/', auth, medicationController.createMedication);

// @route   GET /api/medications
// @desc    Get all medications for current user
// @access  Private
router.get('/', auth, medicationController.getMedications);

// @route   GET /api/medications/:id
// @desc    Get medication by ID
// @access  Private
router.get('/:id', auth, medicationController.getMedicationById);

// @route   PUT /api/medications/:id
// @desc    Update medication
// @access  Private
router.put('/:id', auth, medicationController.updateMedication);

// @route   DELETE /api/medications/:id
// @desc    Delete medication
// @access  Private
router.delete('/:id', auth, medicationController.deleteMedication);

module.exports = router;