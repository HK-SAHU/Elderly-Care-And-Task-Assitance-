const Volunteer = require('../models/Volunteer');
const User = require('../models/User');

// @route   POST /api/volunteers
// @desc    Register as a volunteer
// @access  Private
exports.registerVolunteer = async (req, res) => {
  const { bio, skills, availability } = req.body;

  try {
    // Check if already a volunteer
    let volunteer = await Volunteer.findOne({ user: req.user.id });
    if (volunteer) {
      return res.status(400).json({ msg: 'Already registered as a volunteer' });
    }

    // Create volunteer profile
    volunteer = new Volunteer({
      user: req.user.id,
      bio,
      skills,
      availability
    });

    await volunteer.save();

    // Update user's isVolunteer status
    await User.findByIdAndUpdate(req.user.id, { isVolunteer: true });

    res.status(201).json(volunteer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/volunteers
// @desc    Get all volunteers
// @access  Public
exports.getVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find()
      .populate('user', ['name', 'location', 'age']);
    res.json(volunteers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/volunteers/:id
// @desc    Get volunteer by ID
// @access  Public
exports.getVolunteerById = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id)
      .populate('user', ['name', 'location', 'age']);
    
    if (!volunteer) {
      return res.status(404).json({ msg: 'Volunteer not found' });
    }

    res.json(volunteer);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Volunteer not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/volunteers
// @desc    Update volunteer profile
// @access  Private
exports.updateVolunteer = async (req, res) => {
  const { bio, skills, availability } = req.body;

  // Build volunteer object
  const volunteerFields = {};
  if (bio) volunteerFields.bio = bio;
  if (skills) volunteerFields.skills = skills;
  if (availability) volunteerFields.availability = availability;

  try {
    let volunteer = await Volunteer.findOne({ user: req.user.id });

    if (!volunteer) {
      return res.status(404).json({ msg: 'Volunteer profile not found' });
    }

    volunteer = await Volunteer.findOneAndUpdate(
      { user: req.user.id },
      { $set: volunteerFields },
      { new: true }
    );

    res.json(volunteer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   POST /api/volunteers/review/:id
// @desc    Add review for a volunteer
// @access  Private
exports.addReview = async (req, res) => {
  const { rating, comment } = req.body;

  try {
    const volunteer = await Volunteer.findById(req.params.id);
    
    if (!volunteer) {
      return res.status(404).json({ msg: 'Volunteer not found' });
    }

    const newReview = {
      user: req.user.id,
      rating,
      comment
    };

    volunteer.reviews.unshift(newReview);

    // Calculate new average rating
    const totalRating = volunteer.reviews.reduce((sum, review) => sum + review.rating, 0);
    volunteer.rating = totalRating / volunteer.reviews.length;

    await volunteer.save();

    res.json(volunteer);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};