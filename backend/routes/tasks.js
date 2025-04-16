const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', auth, taskController.createTask);

// @route   GET /api/tasks
// @desc    Get all tasks
// @access  Public
router.get('/', taskController.getTasks);

// @route   GET /api/tasks/open
// @desc    Get all open tasks
// @access  Public
router.get('/open', taskController.getOpenTasks);

// @route   GET /api/tasks/user
// @desc    Get tasks requested by current user
// @access  Private
router.get('/user', auth, taskController.getUserTasks);

// @route   GET /api/tasks/volunteer
// @desc    Get tasks accepted by current volunteer
// @access  Private
router.get('/volunteer', auth, taskController.getVolunteerTasks);

// @route   PUT /api/tasks/:id/accept
// @desc    Accept a task
// @access  Private
router.put('/:id/accept', auth, taskController.acceptTask);

// @route   PUT /api/tasks/:id/complete
// @desc    Complete a task
// @access  Private
router.put('/:id/complete', auth, taskController.completeTask);

// @route   PUT /api/tasks/:id/cancel
// @desc    Cancel a task
// @access  Private
router.put('/:id/cancel', auth, taskController.cancelTask);

module.exports = router;