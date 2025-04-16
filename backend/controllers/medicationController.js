const Medication = require('../models/Medication');

// @route   POST /api/medications
// @desc    Create a new medication
// @access  Private
exports.createMedication = async (req, res) => {
  const { name, dosage, frequency, timeOfDay, startDate, endDate, instructions, reminders } = req.body;

  try {
    const newMedication = new Medication({
      user: req.user.id,
      name,
      dosage,
      frequency,
      timeOfDay,
      startDate,
      endDate,
      instructions,
      reminders
    });

    const medication = await newMedication.save();
    res.status(201).json(medication);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/medications
// @desc    Get all medications for current user
// @access  Private
exports.getMedications = async (req, res) => {
  try {
    const medications = await Medication.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    res.json(medications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// @route   GET /api/medications/:id
// @desc    Get medication by ID
// @access  Private
exports.getMedicationById = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);
    
    if (!medication) {
      return res.status(404).json({ msg: 'Medication not found' });
    }

    // Check user owns the medication
    if (medication.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(medication);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Medication not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   PUT /api/medications/:id
// @desc    Update medication
// @access  Private
exports.updateMedication = async (req, res) => {
  const { name, dosage, frequency, timeOfDay, startDate, endDate, instructions, reminders } = req.body;

  try {
    let medication = await Medication.findById(req.params.id);
    
    if (!medication) {
      return res.status(404).json({ msg: 'Medication not found' });
    }

    // Check user owns the medication
    if (medication.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    // Update fields
    if (name) medication.name = name;
    if (dosage) medication.dosage = dosage;
    if (frequency) medication.frequency = frequency;
    if (timeOfDay) medication.timeOfDay = timeOfDay;
    if (startDate) medication.startDate = startDate;
    if (endDate) medication.endDate = endDate;
    if (instructions !== undefined) medication.instructions = instructions;
    if (reminders !== undefined) medication.reminders = reminders;

    await medication.save();

    res.json(medication);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Medication not found' });
    }
    res.status(500).send('Server error');
  }
};

// @route   DELETE /api/medications/:id
// @desc    Delete medication
// @access  Private
exports.deleteMedication = async (req, res) => {
  try {
    const medication = await Medication.findById(req.params.id);
    
    if (!medication) {
      return res.status(404).json({ msg: 'Medication not found' });
    }

    // Check user owns the medication
    if (medication.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await medication.remove();

    res.json({ msg: 'Medication removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Medication not found' });
    }
    res.status(500).send('Server error');
  }
};