import React, { useState } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';

const AdminUpload = () => {
  const { user } = useAuth();
  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setVideoFile(event.target.files[0]);
    setError('');
    setMessage('');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!courseId || !title || !videoFile) {
      setError('Course ID, title, and video file are required.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('courseId', courseId);
      formData.append('title', title);
      formData.append('duration', duration);
      formData.append('video', videoFile);

      const response = await api.post('/admin/upload-video', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setMessage(response.data.message || 'Video uploaded successfully.');
      setCourseId('');
      setTitle('');
      setDuration('');
      setVideoFile(null);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Upload failed.');
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div style={{ minHeight: '70vh', padding: '40px', textAlign: 'center' }}>
        <h2>Access denied</h2>
        <p>Only administrators can upload secure course videos.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 16px' }}>
      <h1 style={{ marginBottom: 24 }}>Admin Video Upload</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 18 }}>
        <label>
          Course ID
          <input
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            placeholder="Enter course _id"
            style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d1d5db' }}
          />
        </label>

        <label>
          Video title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Lesson title"
            style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d1d5db' }}
          />
        </label>

        <label>
          Video duration
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            placeholder="e.g. 12:30"
            style={{ width: '100%', padding: 12, borderRadius: 8, border: '1px solid #d1d5db' }}
          />
        </label>

        <label>
          Video file
          <input type="file" accept="video/*" onChange={handleFileChange} />
        </label>

        {error && <div style={{ color: '#b91c1c' }}>{error}</div>}
        {message && <div style={{ color: '#047857' }}>{message}</div>}

        <button type="submit" disabled={loading} style={{ background: '#4f46e5', color: 'white', padding: '12px 18px', border: 'none', borderRadius: 8, cursor: 'pointer' }}>
          {loading ? 'Uploading...' : 'Upload Video'}
        </button>
      </form>
    </div>
  );
};

export default AdminUpload;
