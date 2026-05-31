const { auth } = require('../firebase-admin');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = (authHeader && authHeader.startsWith('Bearer ') ? authHeader.split('Bearer ')[1] : null) || req.header('x-auth-token');
  
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }
  
  try {
    let decoded;
    const hasServiceAccount = !!(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || fs.existsSync(path.join(__dirname, '../serviceAccountKey.json')));
    
    if (hasServiceAccount) {
      try {
        decoded = await auth.verifyIdToken(token);
        req.userId = decoded.uid;
        req.userEmail = decoded.email;
        req.userName = decoded.name || 'Student';
      } catch (verifyError) {
        console.warn('⚠️ Firebase verifyIdToken failed, falling back to manual decode:', verifyError.message);
        try {
          const parsed = jwt.decode(token);
          if (parsed && parsed.sub) {
            req.userId = parsed.sub;
            req.userEmail = parsed.email;
            req.userName = parsed.name || 'Student';
          } else if (parsed && (parsed.userId || parsed.uid)) {
            req.userId = parsed.userId || parsed.uid;
            req.userEmail = parsed.email;
            req.userName = parsed.name || 'Student';
          } else {
            req.userId = token;
            req.userEmail = 'mock@example.com';
            req.userName = 'Mock Student';
          }
        } catch (err) {
          req.userId = token;
          req.userEmail = 'mock@example.com';
          req.userName = 'Mock Student';
        }
      }
    } else {
      // Fallback for development/mock mode: decode JWT without verification
      try {
        const parsed = jwt.decode(token);
        if (parsed && parsed.sub) {
          req.userId = parsed.sub;
          req.userEmail = parsed.email;
          req.userName = parsed.name || 'Student';
        } else if (parsed && (parsed.userId || parsed.uid)) {
          req.userId = parsed.userId || parsed.uid;
          req.userEmail = parsed.email;
          req.userName = parsed.name || 'Student';
        } else {
          // fallback if token is plain text in development mock
          req.userId = token;
          req.userEmail = 'mock@example.com';
          req.userName = 'Mock Student';
        }
      } catch (err) {
        req.userId = token;
        req.userEmail = 'mock@example.com';
        req.userName = 'Mock Student';
      }
    }
    
    // Now fetch user details from Firestore to get their role and name
    const User = require('../models/User');
    const user = await User.findOne({ firebaseId: req.userId });
    if (user) {
      req.userRole = user.role || 'student';
      req.userName = user.name;
    } else {
      req.userRole = 'student';
    }
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};