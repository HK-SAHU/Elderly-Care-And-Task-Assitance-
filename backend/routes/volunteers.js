const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const auth = require('../middleware/auth');

// @route   POST /api/volunteers
// @desc    Register as a volunteer
// @access  Private
router.post('/', auth, volunteerController.registerVolunteer);

// @route   GET /api/volunteers
// @desc    Get all volunteers
// @access  Public
router.get('/', volunteerController.getVolunteers);

// @route   GET /api/volunteers/:id
// @desc    Get volunteer by ID
// @access  Public
router.get('/:id', volunteerController.getVolunteerById);

// @route   PUT /api/volunteers
// @desc    Update volunteer profile
// @access  Private
router.put('/', auth, volunteerController.updateVolunteer);

// @route   POST /api/volunteers/review/:id
// @desc    Add review for a volunteer
// @access  Private
router.post('/review/:id', auth, volunteerController.addReview);

module.exports = router;