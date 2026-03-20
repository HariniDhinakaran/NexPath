const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  career: {
    type: String,
    required: true
  },
  weeklyProgress: [{
    week: Number,
    skills: [{
      name: String,
      completed: Boolean,
      completedDate: Date,
      resources: {
        notes: String,
        summary: String,
        videoUrl: String
      }
    }],
    completionPercentage: Number
  }],
  overallProgress: {
    type: Number,
    default: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UserProgress', progressSchema);