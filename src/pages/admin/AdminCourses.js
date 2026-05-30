import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';

const AdminCourses = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');

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
      <div style={{ background: '#f8fafc', minHeight: '90vh', padding: '32px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#0f172a' }}>Admin Courses</h1>
          <p style={{ color: '#64748b', marginBottom: 18, fontWeight: 500 }}>Manage your course catalog.</p>

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

