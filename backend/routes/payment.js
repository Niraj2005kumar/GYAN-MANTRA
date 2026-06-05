const express = require('express');
const crypto = require('crypto');
const Razorpay = require('razorpay');
const auth = require('../middleware/auth');
const Payment = require('../models/Payment');
const Enrollment = require('../models/Enrollment');
const Course = require('../models/Course');
const User = require('../models/User');

const router = express.Router();

// Initialize Razorpay instance
let razorpay = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
  });
}

// Create Razorpay Order
router.post('/create-order', auth, async (req, res) => {
  try {
    if (!razorpay) {
      return res.status(500).json({ message: 'Payment gateway not configured' });
    }

    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required' });
    }

    // Get course details
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({ 
      userId: req.userId, 
      courseId 
    });
    if (existingEnrollment) {
      return res.status(400).json({ message: 'You are already enrolled in this course' });
    }

    // Check for recent successful payment
    const recentPayment = await Payment.findByUserIdAndCourseId(req.userId, courseId);
    if (recentPayment && recentPayment.length > 0) {
      return res.status(400).json({ message: 'You have already purchased this course' });
    }

    // Get user details
    const user = await User.findOne({ firebaseId: req.userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create Razorpay order
    const options = {
      amount: Math.round(course.price * 100), // Razorpay expects amount in paise
      currency: 'INR',
      receipt: `order_${Math.floor(Date.now() / 1000)}`,
      notes: {
        userId: req.userId,
        courseId,
        courseName: course.title,
        userName: user.name,
        userEmail: user.email
      }
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Save payment record in Firestore
    const payment = new Payment({
      orderId: razorpayOrder.id,

      userId: req.userId,
      userName: user.name,
      userEmail: user.email,

      courseId,
      courseTitle: course.title,

      amount: course.price,
      currency: 'INR',

      paymentMethod: 'UPI',

      status: 'pending',

      notes: options.notes
    });

    await payment.save();

    res.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
      userName: user.name,
      userEmail: user.email
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Failed to create payment order' });
  }
});

// Verify Payment and Create Enrollment
router.post('/verify', auth, async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ message: 'Missing payment details' });
    }

    // Verify signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed: Invalid signature' });
    }

    // Get payment record
    const payment = await Payment.findByOrderId(razorpay_order_id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment record not found' });
    }

    // Verify order belongs to current user
    if (payment.userId !== req.userId) {
      return res.status(403).json({ message: 'Unauthorized payment verification' });
    }

    // Update payment record
    payment.paymentId = razorpay_payment_id;
    payment.status = 'success';
    payment.completedAt = new Date();
    await payment.save();

    // Check if enrollment already exists
    const existingEnrollment = await Enrollment.findOne({
      userId: req.userId,
      courseId: payment.courseId
    });

    if (!existingEnrollment) {
      // Get user and course details
      const user = await User.findOne({ firebaseId: req.userId });
      const course = await Course.findById(payment.courseId);

      if (user && course) {
        // Create enrollment
        const enrollment = new Enrollment({
          userId: req.userId,
          courseId: payment.courseId,
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
      }
    }

    res.json({
      success: true,
      message: 'Payment verified and enrollment created',
      payment: {
        paymentId: payment.paymentId,
        orderId: payment.orderId,
        amount: payment.amount,
        status: payment.status,
        courseId: payment.courseId
      }
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ message: 'Payment verification failed' });
  }
});

// Get Payment History
router.get('/history', auth, async (req, res) => {
  try {
    const payments = await Payment.findByUserId(req.userId);
    res.json({
      payments: payments.map(p => ({
        paymentId: p.paymentId,
        orderId: p.orderId,
        courseId: p.courseId,
        amount: p.amount,
        currency: p.currency,
        status: p.status,
        createdAt: p.createdAt,
        completedAt: p.completedAt
      }))
    });
  } catch (error) {
    console.error('Payment history error:', error);
    res.status(500).json({ message: 'Failed to fetch payment history' });
  }
});

// Admin: Get all payments
router.get('/admin/payments', auth, async (req, res) => {
  try {
    // Check if admin
    const user = await User.findOne({ firebaseId: req.userId });
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const summary = await Payment.getRevenueSummary();
    const recentPayments = await Payment.findRecentPayments(20);
    
    res.json({
      summary: {
        totalRevenue: summary.totalRevenue,
        totalPayments: summary.totalPayments,
        recentPayments: recentPayments.map(p => ({
          paymentId: p.paymentId,
          orderId: p.orderId,
          userId: p.userId,
          courseId: p.courseId,
          amount: p.amount,
          status: p.status,
          completedAt: p.completedAt,
          createdAt: p.createdAt
        }))
      }
    });
  } catch (error) {
    console.error('Admin payments error:', error);
    res.status(500).json({ message: 'Failed to fetch payments' });
  }
});

// Admin: Get revenue summary
router.get('/admin/revenue', auth, async (req, res) => {
  try {
    // Check if admin
    const user = await User.findOne({ firebaseId: req.userId });
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const summary = await Payment.getRevenueSummary();
    const todayRevenue = await Payment.getRevenueForToday();
    const now = new Date();
    const monthRevenue = await Payment.getRevenueForMonth(now.getFullYear(), now.getMonth());

    res.json({
      totalRevenue: summary.totalRevenue,
      totalSuccessfulPayments: summary.totalPayments,
      revenueToday: todayRevenue,
      revenueThisMonth: monthRevenue
    });
  } catch (error) {
    console.error('Revenue summary error:', error);
    res.status(500).json({ message: 'Failed to fetch revenue summary' });
  }
});

module.exports = router;
