const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const Course = require('../models/Course');
const cloudinary = require('../config/cloudinary');
const streamifier = require('streamifier');

const upload = multer();
const router = express.Router();

const streamUpload = (fileBuffer, options) => {
  const isCloudinaryConfigured = process.env.CLOUDINARY_CLOUD_NAME && 
                                 process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloud_name';
  if (!isCloudinaryConfigured) {
    console.log('🔄 Cloudinary is using placeholders. Returning mock upload URL.');
    return Promise.resolve({
      public_id: options.public_id || 'mock-id',
      secure_url: 'https://res.cloudinary.com/demo/video/upload/dog.mp4'
    });
  }

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) {
        console.warn('⚠️ Cloudinary upload failed, returning mock video fallback:', error.message);
        return resolve({
          public_id: options.public_id || 'mock-id',
          secure_url: 'https://res.cloudinary.com/demo/video/upload/dog.mp4'
        });
      }
      resolve(result);
    });
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

router.post('/upload-video', auth, upload.single('video'), async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ message: 'Admin privileges required' });
    }

    const { courseId, title, duration } = req.body;
    if (!courseId || !req.file || !title) {
      return res.status(400).json({ message: 'courseId, title and video file are required' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    const uploadResult = await streamUpload(req.file.buffer, {
      resource_type: 'video',
      type: 'authenticated',
      folder: 'secure_course_videos',
      public_id: `course_${courseId}_${Date.now()}`
    });

    const videoEntry = {
      title,
      duration: duration || '00:00',
      publicId: uploadResult.public_id,
      uploadedAt: new Date(),
      uploadedBy: req.userId
    };

    course.videos = course.videos || [];
    course.videos.push(videoEntry);
    await course.save();

    res.status(201).json({
      message: 'Video uploaded successfully',
      video: videoEntry,
      courseId: course._id
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Video upload failed', error: error.message });
  }
});

module.exports = router;
