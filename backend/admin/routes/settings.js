const express = require('express');
const auth = require('../../middleware/auth');
const { db } = require('../../config/firebase');

const router = express.Router();

router.get('/settings', auth, async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const settingsDoc = await db.collection('settings').doc('site').get();
    const settings = settingsDoc.exists ? settingsDoc.data() : {
      siteName: 'Gyan Mantra',
      supportEmail: 'support@gyanmantra.com',
      contactNumber: '+91 99999 99999'
    };

    const firebaseInfo = {
      projectId: process.env.FIREBASE_PROJECT_ID || 'N/A',
      serviceAccountConfigured: !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
      mode: process.env.FIREBASE_SERVICE_ACCOUNT_KEY ? 'real' : 'mock'
    };

    const cloudinaryInfo = {
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'N/A',
      apiKey: process.env.CLOUDINARY_API_KEY ? 'configured' : 'missing',
      apiSecret: process.env.CLOUDINARY_API_SECRET ? 'configured' : 'missing'
    };

    res.json({ settings, firebaseInfo, cloudinaryInfo });
  } catch (error) {
    console.error('Fetch settings error:', error);
    res.status(500).json({ message: 'Unable to fetch settings' });
  }
});

router.put('/settings', auth, async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { siteName, supportEmail, contactNumber } = req.body;
    if (!siteName || !supportEmail || !contactNumber) {
      return res.status(400).json({ message: 'Site name, support email, and contact number are required' });
    }

    const settingsRef = db.collection('settings').doc('site');
    await settingsRef.set({
      siteName,
      supportEmail,
      contactNumber,
      updatedAt: new Date()
    }, { merge: true });

    const updatedSettings = await settingsRef.get();

    res.json({
      message: 'Settings updated successfully',
      settings: updatedSettings.data()
    });
  } catch (error) {
    console.error('Update settings error:', error);
    res.status(500).json({ message: 'Unable to update settings' });
  }
});

module.exports = router;
