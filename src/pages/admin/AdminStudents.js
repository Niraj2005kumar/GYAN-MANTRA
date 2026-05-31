import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminSidebar from '../../components/admin/AdminSidebar';

const AdminStudents = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await api.get('/admin/students');
        setUsers(res.data || []);
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
      <div className="gm-admin-container">
        <AdminSidebar active="students" />
        <div className="gm-admin-content">
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#0f172a' }}>Admin Students</h1>
          <p style={{ margin: 0, color: '#64748b', fontWeight: 500, marginBottom: 18 }}>
            View student profiles, phone numbers, purchased courses, and learning progress.
          </p>

          {error && <div style={{ marginBottom: 12, color: '#b91c1c', fontWeight: 800 }}>{error}</div>}

          <div style={{ display: 'grid', gridTemplateColumns: selectedStudent ? '1fr 340px' : '1fr', gap: 20, alignItems: 'start' }}>
            
            {/* Students Table */}
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 18, overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                      <th style={{ textAlign: 'left', padding: 14, color: '#0f172a', fontSize: 14 }}>Name</th>
                      <th style={{ textAlign: 'left', padding: 14, color: '#0f172a', fontSize: 14 }}>Email</th>
                      <th style={{ textAlign: 'left', padding: 14, color: '#0f172a', fontSize: 14 }}>Phone</th>
                      <th style={{ textAlign: 'left', padding: 14, color: '#0f172a', fontSize: 14 }}>Purchased</th>
                      <th style={{ textAlign: 'left', padding: 14, color: '#0f172a', fontSize: 14 }}>Avg. Progress</th>
                      <th style={{ textAlign: 'right', padding: 14, color: '#0f172a', fontSize: 14 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={6} style={{ padding: 18, color: '#64748b', fontWeight: 700, textAlign: 'center' }}>Loading students list...</td>
                      </tr>
                    ) : users.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: 18, color: '#64748b', fontWeight: 700, textAlign: 'center' }}>
                          No students registered in the database yet.
                        </td>
                      </tr>
                    ) : (
                      users.map((u) => (
                        <tr key={u.id} style={{ borderBottom: '1px solid #f1f5f9', background: selectedStudent?.id === u.id ? '#f8fafc' : 'transparent' }}>
                          <td style={{ padding: 14, fontWeight: 800, color: '#0f172a' }}>{u.name}</td>
                          <td style={{ padding: 14, color: '#64748b', fontWeight: 500 }}>{u.email}</td>
                          <td style={{ padding: 14, color: '#64748b', fontWeight: 500 }}>{u.phoneNumber}</td>
                          <td style={{ padding: 14, color: '#64748b', fontWeight: 500 }}>{u.purchasedCourses?.length || 0} courses</td>
                          <td style={{ padding: 14 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <div style={{ flex: 1, height: 6, background: '#e2e8f0', borderRadius: 3, minWidth: 60 }}>
                                <div style={{ height: '100%', width: `${u.progress}%`, background: 'linear-gradient(90deg, #4f46e5, #7c3aed)', borderRadius: 3 }}></div>
                              </div>
                              <span style={{ color: '#4f46e5', fontWeight: 800, fontSize: 13 }}>{u.progress}%</span>
                            </div>
                          </td>
                          <td style={{ padding: 14, textAlign: 'right' }}>
                            <button 
                              onClick={() => setSelectedStudent(u)}
                              style={{ 
                                padding: '6px 12px', 
                                borderRadius: 8, 
                                border: '1px solid #cbd5e1', 
                                background: '#fff', 
                                color: '#4f46e5', 
                                fontWeight: 700, 
                                cursor: 'pointer' 
                              }}
                            >
                              View Profile
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Student Profile Card Details */}
            {selectedStudent && (
              <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 18, padding: 20, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', display: 'grid', gap: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: 10 }}>
                  <h3 style={{ margin: 0, fontSize: 18, color: '#0f172a' }}>Student Profile</h3>
                  <button 
                    onClick={() => setSelectedStudent(null)}
                    style={{ border: 'none', background: 'transparent', fontSize: 18, cursor: 'pointer', color: '#64748b' }}
                  >
                    ✕
                  </button>
                </div>

                <div>
                  <div style={{ fontSize: 12, color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Account Details</div>
                  <div style={{ fontWeight: 800, color: '#0f172a', fontSize: 15, marginTop: 4 }}>{selectedStudent.name}</div>
                  <div style={{ color: '#64748b', fontSize: 13, marginTop: 2 }}>{selectedStudent.email}</div>
                  <div style={{ color: '#64748b', fontSize: 13, marginTop: 2 }}>Phone: {selectedStudent.phoneNumber}</div>
                  <div style={{ color: '#94a3b8', fontSize: 11, marginTop: 6 }}>ID: {selectedStudent.id}</div>
                </div>

                <div>
                  <div style={{ fontSize: 12, color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>Purchased Courses ({selectedStudent.purchasedCourses?.length || 0})</div>
                  {selectedStudent.purchasedCourses?.length === 0 ? (
                    <div style={{ fontSize: 13, color: '#64748b', fontStyle: 'italic' }}>No courses purchased yet.</div>
                  ) : (
                    <div style={{ display: 'grid', gap: 8 }}>
                      {selectedStudent.purchasedCourses.map((c, idx) => (
                        <div key={idx} style={{ padding: 10, borderRadius: 10, background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                          <div style={{ fontWeight: 700, fontSize: 13, color: '#0f172a' }}>{c.title}</div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginTop: 4 }}>
                            <span>Progress: {c.progress}%</span>
                            <span>Status: {c.progress === 100 ? 'Completed' : 'Enrolled'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminStudents;

