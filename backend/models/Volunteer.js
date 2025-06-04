const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const VolunteerSchema = new mongoose.Schema({
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
  reviews: [ReviewSchema],
  
  averageRating: {
    type: Number,
    default: 0
  },
  verified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate average rating when a review is added or updated
VolunteerSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) {
    this.averageRating = 0;
    return;
  }
  
  const sum = this.reviews.reduce((total, review) => total + review.rating, 0);
  this.averageRating = sum / this.reviews.length;
};

module.exports = mongoose.model('Volunteer', VolunteerSchema);