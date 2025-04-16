const EmergencyContact = require('../models/Emergency');

// @route   POST /api/emergency
// @desc    Create a new emergency contact
// @access  Private
exports.createEmergencyContact = async (req, res) => {
  const { name, relationship, phone, email, address, isPrimary } = req.body;

  try {
    // If this contact is primary, update any existing primary contacts
    if (isPrimary) {
      await EmergencyContact.updateMany(
        { user: req.user.id, isPrimary: true },
        { $set: { isPrimary: false } }
      );
    }

    const newEmergencyContact = new EmergencyContact({
      user: req.user.id,
      name,
      relationship,
      phone,
      email,
      address,
      isPrimary
    });

    const emergencyContact = await newEmergencyContact.save();
    res.status(201).json(emergencyContact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/emergency
// @desc    Get all emergency contacts for current user
// @access  Private
exports.getEmergencyContacts = async (req, res) => {
  try {
    const emergencyContacts = await EmergencyContact.find({ user: req.user.id })
      .sort({ isPrimary: -1, createdAt: -1 });
    res.json(emergencyContacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/emergency/:id
// @desc    Get emergency contact by ID
// @access  Private
exports.getEmergencyContactById = async (req, res) => {
  try {
    const emergencyContact = await EmergencyContact.findById(req.params.id);
    
    if (!emergencyContact) {
      return res.status(404).json({ msg: 'Emergency contact not found' });
    }

    // Check user owns the emergency contact
    if (emergencyContact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(emergencyContact);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Emergency contact not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/emergency/:id
// @desc    Update emergency contact
// @access  Private
exports.updateEmergencyContact = async (req, res) => {
  const { name, relationship, phone, email, address, isPrimary } = req.body;

  try {
    let emergencyContact = await EmergencyContact.findById(req.params.id);
    
    if (!emergencyContact) {
      return res.status(404).json({ msg: 'Emergency contact not found' });
    }

    // Check user owns the emergency contact
    if (emergencyContact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // If this contact is being set as primary, update any existing primary contacts
    if (isPrimary && !emergencyContact.isPrimary) {
      await EmergencyContact.updateMany(
        { user: req.user.id, isPrimary: true },
        { $set: { isPrimary: false } }
      );
    }

    // Update fields
    if (name) emergencyContact.name = name;
    if (relationship) emergencyContact.relationship = relationship;
    if (phone) emergencyContact.phone = phone;
    if (email !== undefined) emergencyContact.email = email;
    if (address !== undefined) emergencyContact.address = address;
    if (isPrimary !== undefined) emergencyContact.isPrimary = isPrimary;

    await emergencyContact.save();

    res.json(emergencyContact);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Emergency contact not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/emergency/:id
// @desc    Delete emergency contact
// @access  Private
exports.deleteEmergencyContact = async (req, res) => {
  try {
    const emergencyContact = await EmergencyContact.findById(req.params.id);
    
    if (!emergencyContact) {
      return res.status(404).json({ msg: 'Emergency contact not found' });
    }

    // Check user owns the emergency contact
    if (emergencyContact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await emergencyContact.remove();

    res.json({ msg: 'Emergency contact removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Emergency contact not found' });
    }
    res.status(500).send('Server error');
  }
};