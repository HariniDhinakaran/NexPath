const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const User = require('../models/user');
const UserProgress = require('../models/UserProgress');
const { careerData, skillMappings, resourceLibrary, jobLinks, initializeProgress } = require('../utils/careerData');

// Get all careers
router.get('/careers', authMiddleware, (req, res) => {
  res.json(careerData);
});

// Select career
router.post('/select-career', authMiddleware, async (req, res) => {
  try {
    const { career } = req.body;
    const user = await User.findById(req.user.userId);
    
    user.selectedCareer = career;
    await user.save();
    
    // Initialize progress with proper structure
    const weeklyProgress = initializeProgress(career);
    
    const progress = new UserProgress({
      userId: user._id,
      career: career,
      weeklyProgress: weeklyProgress,
      overallProgress: 0
    });
    await progress.save();
    
    res.json({ message: 'Career selected successfully', career });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update skills
router.post('/update-skills', authMiddleware, async (req, res) => {
  try {
    const { skills } = req.body;
    const user = await User.findById(req.user.userId);
    
    user.currentSkills = skills;
    await user.save();
    
    res.json({ message: 'Skills updated successfully', skills });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get recommendations
router.get('/recommendations', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const career = user.selectedCareer;
    
    if (!career) {
      return res.status(400).json({ message: 'No career selected' });
    }
    
    const careerSkills = skillMappings[career];
    const currentSkills = user.currentSkills || [];
    
    if (!careerSkills) {
      return res.status(400).json({ message: 'Career mapping not found' });
    }
    
    const requiredSkills = careerSkills.required || [];
    const recommendedSkills = careerSkills.recommended || [];
    const roadmap = careerSkills.roadmap || [];
    
    const skillGaps = requiredSkills.filter(skill => 
      !currentSkills.some(s => s.toLowerCase() === skill.toLowerCase())
    );
    
    res.json({
      requiredSkills,
      recommendedSkills,
      skillGaps,
      roadmap,
      career
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get resources
router.get('/resources/:skill', authMiddleware, (req, res) => {
  const skill = req.params.skill;
  const resources = resourceLibrary[skill] || {
    notes: "Learning resources for this skill are being curated. Stay tuned!",
    summary: "This skill is valuable for your career path. Check online platforms like Coursera, Udemy, and YouTube for comprehensive courses.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  };
  
  res.json(resources);
});

// Get job links
router.get('/job-links', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const career = user.selectedCareer;
    
    const links = jobLinks[career] || [
      `https://www.linkedin.com/jobs/${career.toLowerCase().replace(/\s+/g, '-')}-jobs`,
      `https://www.indeed.com/q-${career.replace(/\s+/g, '-')}-jobs.html`,
      `https://www.naukri.com/${career.toLowerCase().replace(/\s+/g, '-')}-jobs`
    ];
    
    res.json({ links, career });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;