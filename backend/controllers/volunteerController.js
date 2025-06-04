const Volunteer = require('../../models/Volunteer');
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

// @route   POST /api/volunteers/:id/reviews
// @desc    Add a review for a volunteer
// @access  Private
exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ msg: 'Rating must be between 1 and 5' });
    }
    
    const volunteer = await Volunteer.findById(req.params.id);
    
    if (!volunteer) {
      return res.status(404).json({ msg: 'Volunteer not found' });
    }
    
    // Check if user has already reviewed this volunteer
    const existingReviewIndex = volunteer.reviews.findIndex(
      review => review.user.toString() === req.user.id
    );
    
    if (existingReviewIndex !== -1) {
      return res.status(400).json({ msg: 'You have already reviewed this volunteer' });
    }
    
    // Add new review
    volunteer.reviews.unshift({
      user: req.user.id,
      rating,
      comment,
      createdAt: Date.now()
    });
    
    // Calculate new average rating
    volunteer.calculateAverageRating();
    
    await volunteer.save();
    
    res.json(volunteer.reviews[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/volunteers/:id/reviews
// @desc    Update a review for a volunteer
// @access  Private
exports.updateReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ msg: 'Rating must be between 1 and 5' });
    }
    
    const volunteer = await Volunteer.findById(req.params.id);
    
    if (!volunteer) {
      return res.status(404).json({ msg: 'Volunteer not found' });
    }
    
    // Find the review by user ID
    const reviewIndex = volunteer.reviews.findIndex(
      review => review.user.toString() === req.user.id
    );
    
    if (reviewIndex === -1) {
      return res.status(404).json({ msg: 'Review not found' });
    }
    
    // Update the review
    volunteer.reviews[reviewIndex].rating = rating;
    volunteer.reviews[reviewIndex].comment = comment;
    
    // Calculate new average rating
    volunteer.calculateAverageRating();
    
    await volunteer.save();
    
    res.json(volunteer.reviews[reviewIndex]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/volunteers/:id/user-review
// @desc    Get the current user's review for a volunteer
// @access  Private
exports.getUserReview = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    
    if (!volunteer) {
      return res.status(404).json({ msg: 'Volunteer not found' });
    }
    
    // Find the review by user ID
    const review = volunteer.reviews.find(
      review => review.user.toString() === req.user.id
    );
    
    if (!review) {
      return res.status(404).json({ msg: 'Review not found' });
    }
    
    res.json(review);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/volunteers/:id/reviews
// @desc    Get all reviews for a volunteer
// @access  Public
exports.getVolunteerReviews = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id)
      .populate('reviews.user', 'name');
    
    if (!volunteer) {
      return res.status(404).json({ msg: 'Volunteer not found' });
    }
    
    res.json({
      reviews: volunteer.reviews,
      averageRating: volunteer.averageRating
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/volunteers/:id/reviews
// @desc    Delete a review
// @access  Private
exports.deleteReview = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);
    
    if (!volunteer) {
      return res.status(404).json({ msg: 'Volunteer not found' });
    }
    
    // Find the review by user ID
    const reviewIndex = volunteer.reviews.findIndex(
      review => review.user.toString() === req.user.id
    );
    
    if (reviewIndex === -1) {
      return res.status(404).json({ msg: 'Review not found' });
    }
    
    // Remove the review
    volunteer.reviews.splice(reviewIndex, 1);
    
    // Calculate new average rating
    volunteer.calculateAverageRating();
    
    await volunteer.save();
    
    res.json({ msg: 'Review removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};