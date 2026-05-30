const express = require('express');
const auth = require('../middleware/auth');
const Course = require('../models/Course');
const Enrollment = require('../models/Enrollment');
const cloudinary = require('../config/cloudinary');

const router = express.Router();

router.get('/:courseId', auth, async (req, res) => {
  try {
    const course = await Course.findById(req.params.courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const enrollment = await Enrollment.findOne({
      userId: req.userId,
      courseId: req.params.courseId
    });

    if (!enrollment) {
      return res.status(403).json({ message: 'Buy course first' });
    }

    const lessonIndex = Number(req.query.lessonIndex || 0);
    const video = (course.videos || [])[lessonIndex];

    if (!video || !video.publicId) {
      return res.status(404).json({ message: 'Video lesson not available' });
    }

    const expiresAt = Math.floor(Date.now() / 1000) + 600;
    const signedUrl = cloudinary.url(video.publicId, {
      resource_type: 'video',
      type: 'authenticated',
      sign_url: true,
      secure: true,
      expires_at: expiresAt
    });

    res.json({
      url: signedUrl,
      expiresAt,
      lesson: video,
      courseId: course._id,
      courseTitle: course.title,
      lessonIndex
    });
  } catch (error) {
    console.error('Video error:', error);
    res.status(500).json({ message: 'Server error while generating video URL' });
  }
});

module.exports = router;
