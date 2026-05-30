const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

const authRoutes = require('./routes/auth');
const adminAuthRoutes = require('./admin/routes/auth');
const adminCourseRoutes = require('./admin/routes/courses');
const adminUploadRoutes = require('./admin/routes/uploads');
const courseRoutes = require('./routes/courses');
const dashboardRoutes = require('./routes/dashboard');
const videoRoutes = require('./routes/video');
const uploadRoutes = require('./routes/upload');

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminAuthRoutes);
app.use('/api/admin', adminCourseRoutes);
app.use('/api/admin', adminUploadRoutes);
app.use('/api/admin', uploadRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/video', videoRoutes);

app.get('/api/firebase-test', (req, res) => {
  res.json({
    status: 'Firebase auth available ✅',
    firebaseReady: true,
    hasServiceAccount: !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY,
    mode: process.env.FIREBASE_SERVICE_ACCOUNT_KEY ? 'real' : 'mock'
  });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.get('/', (req, res) => {
  res.send('Gyan Mantra API is running 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 Test API: http://localhost:${PORT}/api/test`);
});
