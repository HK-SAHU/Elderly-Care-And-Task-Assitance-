const Task = require('../models/Task');
const User = require('../models/User');
const Volunteer = require('../models/Volunteer');

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
exports.createTask = async (req, res) => {
  const { type, location, date, time, description } = req.body;

  try {
    const newTask = new Task({
      requester: req.user.id,
      type,
      location,
      date,
      time,
      description
    });

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/tasks
// @desc    Get all tasks
// @access  Public
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('requester', ['name', 'location'])
      .populate('volunteer', ['name']);
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/tasks/open
// @desc    Get all open tasks
// @access  Public
exports.getOpenTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ status: 'open' })
      .populate('requester', ['name', 'location']);
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/tasks/user
// @desc    Get tasks requested by current user
// @access  Private
exports.getUserTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ requester: req.user.id })
      .populate('volunteer', ['name']);
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/tasks/volunteer
// @desc    Get tasks accepted by current volunteer
// @access  Private
exports.getVolunteerTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ volunteer: req.user.id })
      .populate('requester', ['name', 'location']);
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/tasks/:id/accept
// @desc    Accept a task
// @access  Private
exports.acceptTask = async (req, res) => {
  try {
    // Check if user is a volunteer
    const user = await User.findById(req.user.id);
    if (!user.isVolunteer) {
      return res.status(400).json({ msg: 'User is not a volunteer' });
    }

    let task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    if (task.status !== 'open') {
      return res.status(400).json({ msg: 'Task is not open for acceptance' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { 
        $set: { 
          status: 'accepted',
          volunteer: req.user.id
        } 
      },
      { new: true }
    ).populate('requester', ['name', 'location']);

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/tasks/:id/complete
// @desc    Complete a task
// @access  Private
exports.completeTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Check if user is the assigned volunteer
    if (task.volunteer.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    if (task.status !== 'accepted') {
      return res.status(400).json({ msg: 'Task must be accepted before completion' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: { status: 'completed' } },
      { new: true }
    );

    // Increment volunteer's tasksCompleted count
    await Volunteer.findOneAndUpdate(
      { user: req.user.id },
      { $inc: { tasksCompleted: 1 } }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/tasks/:id/cancel
// @desc    Cancel a task
// @access  Private
exports.cancelTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Check if user is the requester
    if (task.requester.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: { status: 'cancelled' } },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};