const Location = require('../models/Location');
const axios = require('axios');

// @route   POST /api/location/check-in
// @desc    Create a new location check-in
// @access  Private
exports.checkIn = async (req, res) => {
  try {
    const { latitude, longitude, timestamp } = req.body;
    
    // Get location name using reverse geocoding (optional)
    let locationName = 'Unknown location';
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
        {
          headers: {
            'User-Agent': 'Senior Assist Application'
          }
        }
      );
      
      if (response.data && response.data.display_name) {
        locationName = response.data.display_name;
      }
    } catch (error) {
      console.error('Error getting location name:', error);
    }
    
    const newLocation = new Location({
      user: req.user.id,
      latitude,
      longitude,
      locationName,
      timestamp: timestamp || Date.now()
    });
    
    const location = await newLocation.save();
    
    res.status(201).json(location);
  } catch (err) {
    console.error('Check-in error:', err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/location/check-ins
// @desc    Get all check-ins for the current user
// @access  Private
exports.getCheckIns = async (req, res) => {
  try {
    const checkIns = await Location.find({ user: req.user.id })
      .sort({ timestamp: -1 });
    
    res.json(checkIns);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/location/check-ins/:id
// @desc    Get check-in by ID
// @access  Private
exports.getCheckInById = async (req, res) => {
  try {
    const checkIn = await Location.findById(req.params.id);
    
    if (!checkIn) {
      return res.status(404).json({ msg: 'Check-in not found' });
    }
    
    // Check if the check-in belongs to the current user
    if (checkIn.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    res.json(checkIn);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Check-in not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/location/check-ins/:id
// @desc    Delete a check-in
// @access  Private
exports.deleteCheckIn = async (req, res) => {
  try {
    const checkIn = await Location.findById(req.params.id);
    
    if (!checkIn) {
      return res.status(404).json({ msg: 'Check-in not found' });
    }
    
    // Check if the check-in belongs to the current user
    if (checkIn.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    await checkIn.remove();
    
    res.json({ msg: 'Check-in removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Check-in not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   GET /api/location/recent
// @desc    Get most recent check-in
// @access  Private
exports.getRecentCheckIn = async (req, res) => {
  try {
    const checkIn = await Location.findOne({ user: req.user.id })
      .sort({ timestamp: -1 });
    
    if (!checkIn) {
      return res.status(404).json({ msg: 'No check-ins found' });
    }
    
    res.json(checkIn);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/location/family/:userId
// @desc    Get check-ins for a family member (for caregivers)
// @access  Private
exports.getFamilyMemberCheckIns = async (req, res) => {
  try {
    // This would need additional authorization logic to ensure
    // the requester is authorized to view this user's check-ins
    // For example, checking if the requester is a caregiver for this user
    
    const checkIns = await Location.find({ user: req.params.userId })
      .sort({ timestamp: -1 });
    
    res.json(checkIns);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};