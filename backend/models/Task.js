const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  completedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', taskSchema);