const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Admin Login Verify
router.post('/login', async (req, res) => {
  try {
    const { firebaseId, email } = req.body;

    if (!firebaseId) {
      return res.status(400).json({ message: 'Firebase ID required' });
    }

    const token = jwt.sign(
      { userId: firebaseId, firebaseId, email, role: 'admin' },
      process.env.JWT_SECRET || 'secret123',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Admin login successful ✅',
      token,
      user: { email, firebaseId }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ message: 'Admin login failed' });
  }
});

module.exports = router;
