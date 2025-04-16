const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  skills: [{
    type: String,
    enum: ['Transportation', 'Grocery Shopping', 'Medical Assistance', 'Companionship', 'Home Repair', 'Yard Work', 'Administrative Help', 'Meal Preparation', 'Other']
  }],
  availability: {
    weekdays: Boolean,
    weekends: Boolean,
    mornings: Boolean,
    afternoons: Boolean,
    evenings: Boolean
  },
  rating: {
    type: Number,
    default: 0
  },
  tasksCompleted: {
    type: Number,
    default: 0
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: Number,
    comment: String,
    date: {
      type: Date,
      default: Date.now
    }
  }],
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;