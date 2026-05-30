const express = require('express');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single course
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Enroll in course
router.post('/enroll/:courseId', auth, async (req, res) => {
  try {
    const existing = await Enrollment.findOne({ userId: req.userId, courseId: req.params.courseId });
    if (existing) {
      return res.status(400).json({ message: 'Already enrolled' });
    }
    
    const enrollment = new Enrollment({
      userId: req.userId,
      courseId: req.params.courseId
    });
    await enrollment.save();
    
    res.json({ message: 'Enrolled successfully', enrollment });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update progress
router.put('/progress/:courseId', auth, async (req, res) => {
  try {
    const { progress, currentLesson } = req.body;
    const enrollment = await Enrollment.findOne({ userId: req.userId, courseId: req.params.courseId });
    
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }
    
    enrollment.progress = progress;
    enrollment.currentLesson = currentLesson;
    enrollment.lastAccessed = new Date();
    
    if (progress === 100) {
      enrollment.completedAt = new Date();
    }
    
    await enrollment.save();
    res.json({ message: 'Progress updated', enrollment });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;