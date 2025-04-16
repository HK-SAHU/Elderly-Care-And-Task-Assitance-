const HealthLog = require('../models/HealthLog');

// @route   POST /api/health-logs
// @desc    Create a new health log entry
// @access  Private
exports.createHealthLog = async (req, res) => {
  const { date, metrics } = req.body;

  try {
    // Check if log already exists for this date
    const existingLog = await HealthLog.findOne({
      user: req.user.id,
      date: new Date(date)
    });

    if (existingLog) {
      // Update existing log
      const updatedLog = await HealthLog.findByIdAndUpdate(
        existingLog._id,
        { $set: { metrics } },
        { new: true }
      );
      return res.json(updatedLog);
    }

    // Create new log
    const newHealthLog = new HealthLog({
      user: req.user.id,
      date,
      metrics
    });

    const healthLog = await newHealthLog.save();
    res.status(201).json(healthLog);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/health-logs
// @desc    Get all health logs for current user
// @access  Private
exports.getUserHealthLogs = async (req, res) => {
  try {
    const healthLogs = await HealthLog.find({ user: req.user.id })
      .sort({ date: -1 });
    res.json(healthLogs);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/health-logs/:id
// @desc    Get health log by ID
// @access  Private
exports.getHealthLogById = async (req, res) => {
  try {
    const healthLog = await HealthLog.findById(req.params.id);
    
    if (!healthLog) {
      return res.status(404).json({ msg: 'Health log not found' });
    }

    // Check user owns the health log
    if (healthLog.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(healthLog);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Health log not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/health-logs/:id
// @desc    Delete a health log
// @access  Private
exports.deleteHealthLog = async (req, res) => {
  try {
    const healthLog = await HealthLog.findById(req.params.id);
    
    if (!healthLog) {
      return res.status(404).json({ msg: 'Health log not found' });
    }

    // Check user owns the health log
    if (healthLog.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await healthLog.remove();

    res.json({ msg: 'Health log removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Health log not found' });
    }
    res.status(500).send('Server error');
  }
};