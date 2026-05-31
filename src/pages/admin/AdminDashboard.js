import React, { useEffect, useMemo, useState } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminSidebar from '../../components/admin/AdminSidebar';
import StatsCard from '../../components/admin/StatsCard';


// NOTE: This admin panel is additive and does not modify existing routes/UI.
// It reads Firestore-backed data using the existing backend endpoints where available.

const AdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalEnrollments: 0,
    totalRevenue: 0,
  });
  const [recentEnrollments, setRecentEnrollments] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        // These endpoints do not exist in the current backend.
        // We keep the UI stable and fall back gracefully to zeros.
        // If backend analytics endpoints are added later, this will start using them.
        const [coursesRes, dashboardRes] = await Promise.allSettled([
          api.get('/courses'),
          api.get('/dashboard'),
        ]);

        // Best-effort local fallbacks from existing endpoints.
        const courses = coursesRes.status === 'fulfilled' ? (coursesRes.value.data || []) : [];
        setRecentCourses(courses.slice(0, 4));
        setStats((prev) => ({
          ...prev,
          totalCourses: courses.length,
        }));

        // Student dashboard endpoint requires auth; we can’t reliably use it for global stats.
        if (dashboardRes.status === 'fulfilled' && dashboardRes.value?.data?.stats) {
          // dashboard stats are per user; keep safe.
          setStats((prev) => ({
            ...prev,
            totalEnrollments: prev.totalEnrollments,
            totalStudents: prev.totalStudents,
            totalRevenue: prev.totalRevenue,
          }));
        }

        setRecentEnrollments([]);
      } catch (e) {
        // keep defaults
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [isAdmin]);

  const revenueHint = useMemo(() => {
    // Placeholder: totalRevenue depends on pricing + enrollments.
    // Backend doesn’t currently expose a revenue aggregation.
    return 0;
  }, []);

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="gm-admin-container">
        <AdminSidebar active="dashboard" />
        <div className="gm-admin-content">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 20 }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, color: '#0f172a' }}>Admin Dashboard</h1>
              <p style={{ marginTop: 8, color: '#64748b', fontWeight: 500 }}>
                Overview of your platform activity.
              </p>
            </div>
          </div>

          {loading ? (
            <div style={{ padding: 30, background: 'white', borderRadius: 18, border: '1px solid var(--bdr)' }}>
              Loading dashboard...
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 22 }}>
                <StatsCard title="Total Courses" value={stats.totalCourses} subtitle="Published and saved courses" />
                <StatsCard title="Total Students" value={stats.totalStudents} subtitle="Users in Firestore" />
                <StatsCard title="Total Enrollments" value={stats.totalEnrollments} subtitle="Purchases / enrollments" />
                <StatsCard title="Total Revenue" value={stats.totalRevenue || revenueHint} subtitle="Computed revenue (when supported)" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
                <div style={{ background: 'white', borderRadius: 20, padding: 18, border: '1px solid var(--bdr)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: 0 }}>Recent Courses</h2>
                    <span style={{ color: '#64748b', fontWeight: 600 }}>Latest additions</span>
                  </div>
                  {recentCourses.length === 0 ? (
                    <div style={{ color: '#64748b' }}>No courses loaded yet.</div>
                  ) : (
                    <div style={{ display: 'grid', gap: 10 }}>
                      {recentCourses.map((c) => (
                        <div key={c._id || c.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: 12, borderRadius: 14, border: '1px solid #e2e8f0' }}>
                          <div>
                            <div style={{ fontWeight: 800, color: '#0f172a' }}>{c.title}</div>
                            <div style={{ color: '#64748b', fontSize: 13 }}>{c.category || 'Course'}</div>
                          </div>
                          <div style={{ fontWeight: 800, color: '#4f46e5' }}>{c.price ?? ''}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ background: 'white', borderRadius: 20, padding: 18, border: '1px solid var(--bdr)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: 0 }}>Recent Enrollments</h2>
                    <span style={{ color: '#64748b', fontWeight: 600 }}>Latest purchases</span>
                  </div>
                  <div style={{ color: '#64748b' }}>
                    Enrollment analytics aggregation isn’t exposed by the current backend.
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 18, background: 'white', borderRadius: 20, padding: 18, border: '1px solid var(--bdr)' }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 8 }}>Quick Actions</h2>
                <p style={{ margin: 0, color: '#64748b', marginBottom: 14 }}>
                  Use these shortcuts to manage content.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  <button
                    type="button"
                    onClick={() => (window.location.href = '/admin/upload')}
                    style={{ background: '#4f46e5', color: 'white', border: 'none', padding: '12px 16px', borderRadius: 14, cursor: 'pointer', fontWeight: 800 }}
                  >
                    Upload Video
                  </button>
                  <button
                    type="button"
                    onClick={() => (window.location.href = '/courses')}
                    style={{ background: 'transparent', border: '1px solid #cbd5e1', padding: '12px 16px', borderRadius: 14, cursor: 'pointer', fontWeight: 800, color: '#4f46e5' }}
                  >
                    View Courses
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;

