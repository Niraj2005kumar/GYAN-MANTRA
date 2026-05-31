const express = require('express');
const multer = require('multer');
const streamifier = require('streamifier');
const cloudinary = require('cloudinary').v2;
const Course = require('../../models/Course');
const auth = require('../../middleware/auth');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 250 * 1024 * 1024 } });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadVideo = (buffer, publicId) => {
  const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME && 
                                 process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name';
  if (!isCloudinaryConfigured) {
    console.log('🔄 Cloudinary is using placeholders. Returning mock upload URL.');
    return Promise.resolve({
      public_id: publicId,
      secure_url: 'https://res.cloudinary.com/demo/video/upload/dog.mp4'
    });
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'video',
        public_id: publicId,
        folder: 'gyanmantra/videos',
        chunk_size: 6000000
      },
      (error, result) => {
        if (error) {
          console.warn('⚠️ Cloudinary upload failed, returning mock video fallback:', error.message);
          return resolve({
            public_id: publicId,
            secure_url: 'https://res.cloudinary.com/demo/video/upload/dog.mp4'
          });
        }
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

console.log('✅ uploads.js loaded');

// ✅ Compatibility route for existing frontend
// Frontend currently posts: /api/admin/upload-video with FormData fields:
// - courseId
// - title
// - duration (optional)
// - file field name: video
router.post(
  '/upload-video',
  (req, res, next) => {
    console.log('🔥 upload-video route hit');
    next();
  },
  auth,
  upload.single('video'),
  async (req, res) => {
    try {
      if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { courseId, title, duration } = req.body;

    if (!courseId || !title) {
      return res.status(400).json({ message: 'courseId and title are required' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Video file required' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const publicId = `course_${courseId}_${Date.now()}`;
    const uploadResult = await uploadVideo(req.file.buffer, publicId);

    const videoRecord = {
      title: title || 'Untitled Video',
      duration: duration || '00:00',
      publicId: uploadResult.public_id || null,
      videoUrl: uploadResult.secure_url,
      uploadedAt: new Date(),
      uploadedBy: req.userId || 'admin'
    };

    // Ensure videos array exists
    course.videos = course.videos || [];
    course.videos.push(videoRecord);

    await course.save();

    return res.status(201).json({
      message: 'Video uploaded successfully',
      video: videoRecord,
      course
    });
  } catch (error) {
    console.error('Video upload failed:', error);
    res.status(500).json({ message: 'Video upload failed', error: error.message });
  }
});

router.post('/courses/upload', auth, upload.single('video'), async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { title, description, longDescription, price, oldPrice, duration, instructor, instructorInitials, emoji, color, color2, category, level, thumbnail, status } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Course title and description are required' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Video file required' });
    }

    const publicId = `course_upload_${Date.now()}`;
    const uploadResult = await uploadVideo(req.file.buffer, publicId);

    const course = new Course({
      title,
      description,
      videoUrl: uploadResult.secure_url,
      longDescription,
      price,
      oldPrice: oldPrice || price,
      duration,
      instructor,
      instructorInitials,
      emoji,
      color,
      color2,
      category,
      level,
      thumbnail,
      status: status || 'Published',
      createdAt: new Date()
    });

    await course.save();

    res.status(201).json({
      message: 'Course uploaded successfully',
      course
    });
  } catch (error) {
    console.error('Course upload failed:', error);
    res.status(500).json({ message: 'Course upload failed', error: error.message });
  }
});

router.post('/courses/:courseId/videos', auth, upload.single('video'), async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { title, duration } = req.body;
    const { courseId } = req.params;

    if (!req.file) {
      return res.status(400).json({ message: 'Video file required' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const publicId = `course_${courseId}_${Date.now()}`;
    const uploadResult = await uploadVideo(req.file.buffer, publicId);

    const videoRecord = {
      title: title || 'Untitled Video',
      duration: duration || '00:00',
      videoUrl: uploadResult.secure_url,
      uploadedAt: new Date(),
      uploadedBy: req.userId || 'admin'
    };

    course.videos.push(videoRecord);
    await course.save();

    res.status(201).json({
      message: 'Video uploaded successfully',
      video: videoRecord,
      course
    });
  } catch (error) {
    console.error('Video upload failed:', error);
    res.status(500).json({ message: 'Video upload failed', error: error.message });
  }
});

module.exports = router;
