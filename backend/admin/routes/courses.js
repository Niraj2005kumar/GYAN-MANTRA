const express = require('express');
const Course = require('../../models/Course');
const auth = require('../../middleware/auth');
const { db } = require('../../config/firebase');

const router = express.Router();

router.post('/courses', auth, async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const courseData = req.body;
    const course = new Course({
      title: courseData.title,
      description: courseData.description,
      longDescription: courseData.longDescription,
      price: courseData.price,
      oldPrice: courseData.oldPrice || courseData.price,
      duration: courseData.duration,
      rating: courseData.rating || 0,
      reviews: courseData.reviews || 0,
      instructor: courseData.instructor,
      instructorInitials: courseData.instructorInitials,
      emoji: courseData.emoji,
      color: courseData.color,
      color2: courseData.color2,
      category: courseData.category,
      level: courseData.level,
      syllabus: courseData.syllabus || [],
      thumbnail: courseData.thumbnail,
      stock: courseData.stock || 0,
      tags: courseData.tags || [],
      status: courseData.status || 'Published',
      students: courseData.students || 0,
      videos: courseData.videos || []
    });

    await course.save();
    res.status(201).json(typeof course.toObject === 'function' ? course.toObject() : course);
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ message: 'Unable to create course' });
  }
});

router.get('/analytics', auth, async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const courses = await Course.find();
    const totalCourses = courses.length;

    const usersSnapshot = await db.collection('users').get();
    const totalStudents = usersSnapshot.size;

    const enrollmentsSnapshot = await db.collection('enrollments').get();
    const enrollments = enrollmentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const totalEnrollments = enrollments.length;

    const completedCourses = enrollments.filter(e => Number(e.progress) === 100).length;
    const averageProgress = totalEnrollments > 0
      ? Math.round(enrollments.reduce((sum, e) => sum + (Number(e.progress) || 0), 0) / totalEnrollments)
      : 0;

    const totalRevenue = enrollments.reduce((sum, e) => sum + (Number(e.courseInfo?.price) || 0), 0);

    const recentCourses = courses
      .slice()
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map(course => ({
        id: course._id,
        title: course.title,
        category: course.category,
        price: course.price,
        createdAt: course.createdAt
      }));

    const recentEnrollments = enrollments
      .slice()
      .sort((a, b) => new Date(b.enrolledAt) - new Date(a.enrolledAt))
      .slice(0, 5)
      .map(enrollment => ({
        id: enrollment.id,
        courseTitle: enrollment.courseInfo?.title || 'Unknown Course',
        studentName: enrollment.userInfo?.name || 'Unknown Student',
        progress: enrollment.progress || 0,
        enrolledAt: enrollment.enrolledAt
      }));

    res.json({
      totalCourses,
      totalStudents,
      totalEnrollments,
      completedCourses,
      averageProgress,
      totalRevenue,
      recentCourses,
      recentEnrollments
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ message: 'Unable to fetch analytics' });
  }
});

router.put('/courses/:id', auth, async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(typeof course.toObject === 'function' ? course.toObject() : course);
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({ message: 'Unable to update course' });
  }
});

router.delete('/courses/:id', auth, async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ message: 'Unable to delete course' });
  }
});

// Get all students/users with their enrollments
router.get('/students', auth, async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { db } = require('../../config/firebase');

    // 1. Fetch all users from Firestore
    const usersSnapshot = await db.collection('users').get();
    const users = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // 2. Fetch all enrollments from Firestore
    const enrollmentsSnapshot = await db.collection('enrollments').get();
    const enrollments = enrollmentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // 3. Combine user data with their enrollments
    const students = users.map(user => {
      // Filter enrollments for this user
      const userEnrollments = enrollments.filter(e => e.userId === user.id || e.userId === user.firebaseId);
      
      return {
        id: user.id,
        name: user.name || 'Student',
        email: user.email,
        phoneNumber: user.phoneNumber || user.phone || 'N/A',
        role: user.role,
        createdAt: user.createdAt,
        purchasedCourses: userEnrollments.map(e => ({
          courseId: e.courseId,
          title: e.courseInfo?.title || 'Unknown Course',
          price: e.courseInfo?.price || 0,
          progress: e.progress || 0,
          enrolledAt: e.enrolledAt,
          lastAccessed: e.lastAccessed
        })),
        progress: userEnrollments.length > 0 
          ? Math.round(userEnrollments.reduce((acc, curr) => acc + (curr.progress || 0), 0) / userEnrollments.length)
          : 0
      };
    });

    res.json(students);
  } catch (error) {
    console.error('Fetch students error:', error);
    res.status(500).json({ message: 'Unable to fetch students data' });
  }
});

module.exports = router;
