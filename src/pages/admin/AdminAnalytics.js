import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminSidebar from '../../components/admin/AdminSidebar';
import StatsCard from '../../components/admin/StatsCard';

const AdminAnalytics = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await api.get('/admin/analytics');
        setAnalytics(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };
    loadAnalytics();
  }, []);

  if (!user || user.role !== 'admin') return null;

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="gm-admin-container">
        <AdminSidebar active="analytics" />
        <div className="gm-admin-content">
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#0f172a' }}>Admin Analytics</h1>
          <p style={{ margin: 0, color: '#64748b', fontWeight: 500, marginBottom: 18 }}>
            Live analytics powered by your Firestore course, enrollment, and user data.
          </p>

          {error && <div style={{ marginBottom: 18, color: '#b91c1c', fontWeight: 700 }}>{error}</div>}

          {loading || !analytics ? (
            <div style={{ padding: 28, background: 'white', borderRadius: 18, border: '1px solid var(--bdr)' }}>Loading analytics...</div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 22 }}>
                <StatsCard title="Total Courses" value={analytics.totalCourses} subtitle="Published courses" />
                <StatsCard title="Total Students" value={analytics.totalStudents} subtitle="Registered students" />
                <StatsCard title="Total Enrollments" value={analytics.totalEnrollments} subtitle="Course purchases" />
                <StatsCard title="Completed Courses" value={analytics.completedCourses} subtitle="Fully completed enrollments" />
                <StatsCard title="Average Progress" value={`${analytics.averageProgress}%`} subtitle="Average learner progress" />
                <StatsCard title="Total Revenue" value={`₹${analytics.totalRevenue}`} subtitle="Revenue from enrolled courses" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ background: 'white', borderRadius: 18, border: '1px solid var(--bdr)', padding: 18 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 14, color: '#0f172a' }}>Recent Courses</h2>
                  {analytics.recentCourses.length === 0 ? (
                    <div style={{ color: '#64748b' }}>No recent courses found.</div>
                  ) : (
                    <div style={{ display: 'grid', gap: 12 }}>
                      {analytics.recentCourses.map((course) => (
                        <div key={course.id} style={{ background: '#f8fafc', borderRadius: 14, padding: 14 }}>
                          <div style={{ fontWeight: 800, color: '#0f172a' }}>{course.title}</div>
                          <div style={{ color: '#64748b', fontSize: 13 }}>{course.category || 'General'}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ background: 'white', borderRadius: 18, border: '1px solid var(--bdr)', padding: 18 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 14, color: '#0f172a' }}>Recent Enrollments</h2>
                  {analytics.recentEnrollments.length === 0 ? (
                    <div style={{ color: '#64748b' }}>No recent enrollments found.</div>
                  ) : (
                    <div style={{ display: 'grid', gap: 12 }}>
                      {analytics.recentEnrollments.map((enrollment) => (
                        <div key={enrollment.id} style={{ background: '#f8fafc', borderRadius: 14, padding: 14 }}>
                          <div style={{ fontWeight: 800, color: '#0f172a' }}>{enrollment.courseTitle}</div>
                          <div style={{ color: '#64748b', fontSize: 13 }}>{enrollment.studentName}</div>
                          <div style={{ marginTop: 8, color: '#0f172a', fontWeight: 700 }}>{enrollment.progress || 0}% progress</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminAnalytics;

