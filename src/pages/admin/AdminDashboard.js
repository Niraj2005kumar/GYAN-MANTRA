import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminSidebar from '../../components/admin/AdminSidebar';
import StatsCard from '../../components/admin/StatsCard';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalRevenue: 0,
    revenueToday: 0,
    revenueThisMonth: 0,
  });
  const [recentPayments, setRecentPayments] = useState([]);
  const [recentCourses, setRecentCourses] = useState([]);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (!isAdmin) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const [coursesRes, revenueRes, paymentsRes] = await Promise.allSettled([
          api.get('/courses'),
          api.get('/payment/admin/revenue'),
          api.get('/payment/admin/payments')
        ]);

        // Get courses
        const courses = coursesRes.status === 'fulfilled' ? (coursesRes.value.data || []) : [];
        setRecentCourses(courses.slice(0, 4));

        // Get revenue data
        if (revenueRes.status === 'fulfilled' && revenueRes.value?.data) {
          const revenueData = revenueRes.value.data;
          setStats((prev) => ({
            ...prev,
            totalCourses: courses.length,
            totalRevenue: revenueData.totalRevenue || 0,
            revenueToday: revenueData.revenueToday || 0,
            revenueThisMonth: revenueData.revenueThisMonth || 0,
          }));
        } else {
          setStats((prev) => ({
            ...prev,
            totalCourses: courses.length,
          }));
        }

        // Get recent payments
        if (paymentsRes.status === 'fulfilled' && paymentsRes.value?.data?.summary?.recentPayments) {
          setRecentPayments(paymentsRes.value.data.summary.recentPayments.slice(0, 5));
        }
      } catch (e) {
        console.error('Error loading admin dashboard:', e);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [isAdmin]);

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="gm-admin-container">
        <AdminSidebar active="dashboard" />
        <div className="gm-admin-content">
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 16, marginBottom: 20 }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, color: '#0f172a' }}>Admin Dashboard</h1>
              <p style={{ marginTop: 8, color: '#64748b', fontWeight: 500 }}>
                Overview of your platform activity and revenue.
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
                <StatsCard title="Total Courses" value={stats.totalCourses} subtitle="Published courses" />
                <StatsCard title="Total Revenue" value={`₹${stats.totalRevenue.toLocaleString()}`} subtitle="All time revenue" />
                <StatsCard title="Revenue Today" value={`₹${stats.revenueToday.toLocaleString()}`} subtitle="Today's income" />
                <StatsCard title="This Month" value={`₹${stats.revenueThisMonth.toLocaleString()}`} subtitle="Current month" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
                <div style={{ background: 'white', borderRadius: 20, padding: 18, border: '1px solid var(--bdr)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: 0 }}>Recent Courses</h2>
                    <span style={{ color: '#64748b', fontWeight: 600 }}>Latest</span>
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
                          <div style={{ fontWeight: 800, color: '#4f46e5' }}>₹{c.price || 0}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ background: 'white', borderRadius: 20, padding: 18, border: '1px solid var(--bdr)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', margin: 0 }}>Recent Payments</h2>
                    <span style={{ color: '#64748b', fontWeight: 600 }}>Latest {recentPayments.length}</span>
                  </div>
                  {recentPayments.length === 0 ? (
                    <div style={{ color: '#64748b' }}>No payments yet.</div>
                  ) : (
                    <div style={{ display: 'grid', gap: 10 }}>
                      {recentPayments.map((p, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: 12, borderRadius: 14, border: '1px solid #e2e8f0', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontWeight: 800, color: '#0f172a', fontSize: 13 }}>ID: {p.paymentId?.substring(0, 12) || 'N/A'}...</div>
                            <div style={{ color: '#64748b', fontSize: 12 }}>{p.completedAt ? new Date(p.completedAt).toLocaleDateString() : 'Pending'}</div>
                          </div>
                          <div style={{ fontWeight: 800, color: '#10b981' }}>₹{p.amount}</div>
                        </div>
                      ))}
                    </div>
                  )}
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
                    onClick={() => (window.location.href = '/admin/analytics')}
                    style={{ background: 'transparent', border: '1px solid #cbd5e1', padding: '12px 16px', borderRadius: 14, cursor: 'pointer', fontWeight: 800, color: '#4f46e5' }}
                  >
                    View Analytics
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
