const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const UserProgress = require('../models/UserProgress');

// Get progress
router.get('/progress', authMiddleware, async (req, res) => {
  try {
    const progress = await UserProgress.findOne({ userId: req.user.userId });
    res.json(progress || { weeklyProgress: [], overallProgress: 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update weekly progress
router.post('/update-week', authMiddleware, async (req, res) => {
  try {
    const { week, skillsCompleted } = req.body;
    const progress = await UserProgress.findOne({ userId: req.user.userId });
    
    if (!progress) {
      return res.status(404).json({ message: 'Progress not found' });
    }
    
    // Update specific week's progress
    if (progress.weeklyProgress[week - 1]) {
      progress.weeklyProgress[week - 1].skills.forEach(skill => {
        if (skillsCompleted.includes(skill.name)) {
          skill.completed = true;
          skill.completedDate = new Date();
        }
      });
      
      const completedCount = progress.weeklyProgress[week - 1].skills.filter(s => s.completed).length;
      progress.weeklyProgress[week - 1].completionPercentage = 
        (completedCount / progress.weeklyProgress[week - 1].skills.length) * 100;
    }
    
    // Calculate overall progress
    let totalCompleted = 0;
    let totalSkills = 0;
    progress.weeklyProgress.forEach(week => {
      week.skills.forEach(skill => {
        totalSkills++;
        if (skill.completed) totalCompleted++;
      });
    });
    
    progress.overallProgress = (totalCompleted / totalSkills) * 100;
    progress.lastUpdated = new Date();
    
    await progress.save();
    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;