import React, { useState, useEffect } from 'react';
import api from '../api';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminSidebar from '../components/admin/AdminSidebar';

const AdminUpload = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [courseId, setCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await api.get('/courses');
        setCourses(response.data || []);
      } catch (err) {
        console.error('Failed to load courses for upload dropdown:', err);
      }
    };
    fetchCourses();
  }, []);

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
    <ProtectedRoute adminOnly={true}>
      <div className="gm-admin-container">
        <AdminSidebar active="upload" />
        <div className="gm-admin-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '100%', maxWidth: 640, background: '#fff', border: '1px solid #e2e8f0', padding: 28, borderRadius: 20, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 20, color: '#0f172a' }}>Admin Video Upload</h1>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 18 }}>
              
              <label style={{ display: 'grid', gap: 6, fontWeight: 700, color: '#374151' }}>
                Select Course
                <select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15, background: '#fff' }}
                >
                  <option value="">-- Choose Course --</option>
                  {courses.map((c) => (
                    <option key={c._id || c.id} value={c._id || c.id}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </label>

              <label style={{ display: 'grid', gap: 6, fontWeight: 700, color: '#374151' }}>
                Video title
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Lesson title (e.g. 1. Introduction)"
                  style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
                />
              </label>

              <label style={{ display: 'grid', gap: 6, fontWeight: 700, color: '#374151' }}>
                Video duration
                <input
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="e.g. 12:30"
                  style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
                />
              </label>

              <label style={{ display: 'grid', gap: 6, fontWeight: 700, color: '#374151' }}>
                Video file
                <input 
                  type="file" 
                  accept="video/*" 
                  onChange={handleFileChange} 
                  style={{ width: '100%', padding: 10, border: '1px dashed #cbd5e1', borderRadius: 10, background: '#f8fafc', fontSize: 14 }}
                />
              </label>

              {error && <div style={{ color: '#b91c1c', fontWeight: 600 }}>{error}</div>}
              {message && <div style={{ color: '#047857', fontWeight: 600 }}>{message}</div>}

              <button 
                type="submit" 
                disabled={loading} 
                style={{ 
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', 
                  color: 'white', 
                  padding: '14px 18px', 
                  border: 'none', 
                  borderRadius: 12, 
                  cursor: 'pointer',
                  fontWeight: 700,
                  fontSize: 16,
                  transition: 'opacity 0.2s'
                }}
              >
                {loading ? 'Uploading secure stream...' : 'Upload Secure Video'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminUpload;
