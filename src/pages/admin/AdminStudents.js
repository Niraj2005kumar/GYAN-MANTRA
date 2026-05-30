import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';

const AdminStudents = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        // No existing backend endpoint for /users list. Keep UI stable.
        // If you add an endpoint later, this page will start showing real data.
        setUsers([]);
      } catch (e) {
        setError(e.response?.data?.message || 'Failed to load students');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (!user || user.role !== 'admin') return null;

  return (
    <ProtectedRoute adminOnly={true}>
      <div style={{ background: '#f8fafc', minHeight: '90vh', padding: '32px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#0f172a' }}>Admin Students</h1>
          <p style={{ margin: 0, color: '#64748b', fontWeight: 500, marginBottom: 18 }}>
            View users and their enrollment history.
          </p>

          {error && <div style={{ marginBottom: 12, color: '#b91c1c', fontWeight: 800 }}>{error}</div>}

          <div style={{ background: 'white', border: '1px solid var(--bdr)', borderRadius: 18, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                  <th style={{ textAlign: 'left', padding: 14, color: '#0f172a' }}>Name</th>
                  <th style={{ textAlign: 'left', padding: 14, color: '#0f172a' }}>Email</th>
                  <th style={{ textAlign: 'left', padding: 14, color: '#0f172a' }}>Courses</th>
                  <th style={{ textAlign: 'left', padding: 14, color: '#0f172a' }}>Progress</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} style={{ padding: 18, color: '#64748b', fontWeight: 700 }}>Loading...</td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ padding: 18, color: '#64748b', fontWeight: 700 }}>
                      Students listing endpoint is not implemented in the current backend.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id || u.firebaseId} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: 14, fontWeight: 800, color: '#0f172a' }}>{u.name}</td>
                      <td style={{ padding: 14, color: '#64748b', fontWeight: 600 }}>{u.email}</td>
                      <td style={{ padding: 14, color: '#64748b', fontWeight: 600 }}>{u.enrolledCourses?.length || 0}</td>
                      <td style={{ padding: 14, color: '#4f46e5', fontWeight: 900 }}>{u.progress ?? 0}%</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminStudents;

