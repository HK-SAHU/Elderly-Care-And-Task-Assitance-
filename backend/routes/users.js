const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// @route   POST /api/users
// @desc    Register a user
// @access  Public
router.post('/', userController.registerUser);

// @route   PUT /api/users/:id
// @desc    Update user profile
// @access  Private
router.put('/:id', auth, userController.updateUser);

module.exports = router;