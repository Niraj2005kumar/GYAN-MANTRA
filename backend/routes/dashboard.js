const express = require('express');
const auth = require('../middleware/auth');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');

const router = express.Router();

// ===============================
// ✅ 1. GET DASHBOARD DATA
// ===============================
router.get('/', auth, async (req, res) => {
  try {
    const enrollments = await Enrollment
      .find({ userId: req.userId })
      .populate('courseId');

    // 🔥 safe mapping (avoid null course)
    const enrolledCourses = enrollments
      .filter(e => e.courseId && typeof e.courseId === 'object')
      .map(e => ({
        ...e.courseId.toObject(),
        progress: e.progress || 0,
        enrolledAt: e.enrolledAt,
        lastAccessed: e.lastAccessed
      }));

    const totalCourses = enrolledCourses.length;

    const completedCourses = enrolledCourses.filter(
      c => c.progress === 100
    ).length;

    const averageProgress =
      totalCourses > 0
        ? enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / totalCourses
        : 0;

    res.json({
      enrolledCourses,
      stats: {
        totalCourses,
        completedCourses,
        averageProgress: Math.round(averageProgress)
      }
    });

  } catch (error) {
    console.error('Dashboard GET error:', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// ===============================
// ✅ 2. ENROLL (BUY COURSE)
// ===============================
router.post('/enroll', auth, async (req, res) => {
  try {
    const { courseId } = req.body;

    // 🔍 check course exist
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // 🔍 check already enrolled
    const existing = await Enrollment.findOne({
      userId: req.userId,
      courseId
    });

    if (existing) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    // 🔍 fetch user profile for storing info
    const User = require('../models/User');
    const user = await User.findOne({ firebaseId: req.userId });
    if (!user) {
      return res.status(404).json({ message: 'User profile not found' });
    }

    // ✅ create enrollment
    const enrollment = new Enrollment({
      userId: req.userId,
      courseId,
      progress: 0,
      enrolledAt: new Date(),
      lastAccessed: new Date(),
      userInfo: {
        name: user.name,
        email: user.email
      },
      courseInfo: {
        title: course.title,
        price: course.price,
        instructor: course.instructor,
        thumbnail: course.thumbnail || null
      }
    });

    await enrollment.save();

    res.json({
      message: 'Course enrolled successfully ✅',
      enrollment
    });

  } catch (error) {
    console.error('Dashboard ENROLL error (POST /api/dashboard/enroll):', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

// ===============================
// ✅ 3. UPDATE PROGRESS (BONUS 🔥)
// ===============================
router.put('/progress', auth, async (req, res) => {
  try {
    const { courseId, progress } = req.body;

    const enrollment = await Enrollment.findOne({
      userId: req.userId,
      courseId
    });

    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    enrollment.progress = progress;
    enrollment.lastAccessed = new Date();

    await enrollment.save();

    res.json({ message: 'Progress updated ✅' });

  } catch (error) {
    console.error('Dashboard PROGRESS error (PUT /api/dashboard/progress):', error);
    res.status(500).json({ message: error.message || 'Server error' });
  }
});

module.exports = router;

