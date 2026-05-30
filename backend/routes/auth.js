const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');
const { auth } = require('../firebase-admin');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Helper to verify/decode Firebase ID token (with mock fallback)
const verifyToken = async (token) => {
  const hasServiceAccount = !!(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || fs.existsSync(path.join(__dirname, '../serviceAccountKey.json')));
  if (hasServiceAccount) {
    return await auth.verifyIdToken(token);
  } else {
    try {
      const decoded = jwt.decode(token);
      if (decoded && decoded.sub) {
        return { uid: decoded.sub, email: decoded.email, name: decoded.name };
      }
    } catch (e) {}
    return { uid: token, email: 'mock@example.com' };
  }
};

router.post('/signup', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split('Bearer ')[1] : null) || req.body.token;

    if (!token) {
      return res.status(400).json({ message: 'Firebase token is required' });
    }

    const decoded = await verifyToken(token);
    const firebaseId = decoded.uid;
    const email = decoded.email || req.body.email;
    const name = req.body.name || decoded.name || 'Student';

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    let user = await User.findOne({ firebaseId });
    if (!user) {
      // Create user document with firebaseId as the document ID
      user = new User({
        _id: firebaseId,
        firebaseId,
        name,
        email,
        role: email === 'admin@gyanmantra.com' || email === 'admin@edunova.com' ? 'admin' : 'student',
        enrolledCourses: [],
        password: 'firebase-auth' // placeholder password since they are authenticated via Firebase
      });
      await user.save();
    }

    res.status(201).json({
      message: 'Signup successful',
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Signup failed' });
  }
});

// Compatibility route for backend login using Firebase ID Token
router.post('/login', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    const token = (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split('Bearer ')[1] : null) || req.body.token;

    if (!token) {
      return res.status(400).json({ message: 'Firebase token is required' });
    }

    const decoded = await verifyToken(token);
    const firebaseId = decoded.uid;

    const user = await User.findOne({ firebaseId });
    if (!user) {
      return res.status(404).json({ message: 'User profile not found in database' });
    }

    res.json({
      message: 'Login successful',
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

router.get('/me', authMiddleware, async (req, res) => {
  try {
    let user = await User.findOne({ firebaseId: req.userId });
    if (!user) {
      // Auto-create user profile in Firestore if they are authenticated in Firebase Auth but profile is missing
      user = new User({
        _id: req.userId,
        firebaseId: req.userId,
        name: req.userName || 'Student',
        email: req.userEmail,
        role: req.userEmail === 'admin@gyanmantra.com' || req.userEmail === 'admin@edunova.com' ? 'admin' : 'student',
        enrolledCourses: [],
        password: 'firebase-auth'
      });
      await user.save();
      console.log(`👤 Auto-created Firestore profile for user: ${req.userEmail}`);
    }

    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        enrolledCourses: user.enrolledCourses || []
      }
    });
  } catch (error) {
    console.error('Auth me error:', error);
    res.status(500).json({ message: 'Unable to validate token' });
  }
});

module.exports = router;
