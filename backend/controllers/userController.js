const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @route   POST /api/users
// @desc    Register a user
// @access  Public
exports.registerUser = async (req, res) => {
  const { name, email, password, age, gender, address, phone } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      age,
      gender,
      address,
      phone
    });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user to database
    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id
      }
    };

    // Generate token
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5d' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
      }
    );
    
    console.log('User registered successfully:', user.email);
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/users/:id
// @desc    Update user profile
// @access  Private
exports.updateUser = async (req, res) => {
  const { name, age, location, phone, emergencyContact } = req.body;

  // Build user object
  const userFields = {};
  if (name) userFields.name = name;
  if (age) userFields.age = age;
  if (location) userFields.location = location;
  if (phone) userFields.phone = phone;
  if (emergencyContact) userFields.emergencyContact = emergencyContact;

  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Make sure user owns the profile
    if (user.id.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: userFields },
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};