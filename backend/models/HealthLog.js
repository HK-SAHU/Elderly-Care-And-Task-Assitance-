const mongoose = require('mongoose');

const healthLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  metrics: {
    heartRate: Number,
    bloodPressure: {
      systolic: Number,
      diastolic: Number
    },
    bloodSugar: Number,
    weight: Number,
    steps: Number,
    sleepHours: Number,
    medications: [{
      name: String,
      dosage: String,
      time: String,
      taken: Boolean
    }],
    meals: [{
      type: String,
      description: String,
      time: String
    }],
    symptoms: [{
      description: String,
      severity: Number
    }],
    notes: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const HealthLog = mongoose.model('HealthLog', healthLogSchema);

module.exports = HealthLog;