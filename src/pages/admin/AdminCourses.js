import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminSidebar from '../../components/admin/AdminSidebar';

const AdminCourses = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await api.get('/courses');
        setCourses(res.data || []);
      } catch (e) {
        setError(e.response?.data?.message || 'Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="gm-admin-container">
        <AdminSidebar active="courses" />
        <div className="gm-admin-content">
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#0f172a' }}>Admin Courses</h1>
          <p style={{ color: '#64748b', marginBottom: 18, fontWeight: 500 }}>Manage your course catalog.</p>

          <div style={{ marginBottom: 20, padding: 20, background: '#f8fafc', borderRadius: 18, border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 14, color: '#0f172a' }}>Create New Course</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              <input
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="Course title"
                style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
              />
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Category (optional)"
                style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
              />
              <textarea
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                placeholder="Course description"
                rows={3}
                style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15, resize: 'vertical' }}
              />
              <input
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="Price"
                type="number"
                min="0"
                style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
              />
              <button
                type="button"
                onClick={async () => {
                  if (!newTitle.trim() || !newDescription.trim()) {
                    setError('Title and description are required to create a course.');
                    setSuccess('');
                    return;
                  }
                  setCreating(true);
                  setError('');
                  setSuccess('');

                  try {
                    const response = await api.post('/admin/courses', {
                      title: newTitle.trim(),
                      description: newDescription.trim(),
                      category: newCategory.trim() || 'General',
                      price: Number(newPrice) || 0,
                      status: 'Published'
                    });

                    const createdCourse = response.data;
                    setCourses((prev) => [createdCourse, ...prev]);
                    setNewTitle('');
                    setNewDescription('');
                    setNewCategory('');
                    setNewPrice('');
                    setSuccess('Course created successfully.');
                  } catch (e) {
                    setError(e.response?.data?.message || 'Failed to create course');
                  } finally {
                    setCreating(false);
                  }
                }}
                disabled={creating}
                style={{ width: 'max-content', padding: '12px 18px', borderRadius: 12, border: 'none', cursor: 'pointer', background: '#4f46e5', color: '#fff', fontWeight: 700 }}
              >
                {creating ? 'Creating course…' : 'Create Course'}
              </button>
              {success && <div style={{ color: '#047857', fontWeight: 600 }}>{success}</div>}
            </div>
          </div>

          {error && <div style={{ marginBottom: 12, color: '#b91c1c', fontWeight: 700 }}>{error}</div>}

          {loading ? (
            <div style={{ background: 'white', border: '1px solid var(--bdr)', borderRadius: 18, padding: 20 }}>Loading...</div>
          ) : (
            <div style={{ background: 'white', border: '1px solid var(--bdr)', borderRadius: 18, overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ textAlign: 'left', padding: 14, color: '#0f172a' }}>Title</th>
                    <th style={{ textAlign: 'left', padding: 14, color: '#0f172a' }}>Category</th>
                    <th style={{ textAlign: 'right', padding: 14, color: '#0f172a' }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c) => (
                    <tr key={c._id || c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: 14, fontWeight: 800, color: '#0f172a' }}>{c.title}</td>
                      <td style={{ padding: 14, color: '#64748b', fontWeight: 600 }}>{c.category || '—'}</td>
                      <td style={{ padding: 14, textAlign: 'right', fontWeight: 800, color: '#4f46e5' }}>{c.price ?? ''}</td>
                    </tr>
                  ))}
                  {courses.length === 0 && (
                    <tr>
                      <td colSpan={3} style={{ padding: 18, color: '#64748b', fontWeight: 700 }}>No courses found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminCourses;

