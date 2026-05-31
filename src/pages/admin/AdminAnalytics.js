import React from 'react';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminSidebar from '../../components/admin/AdminSidebar';

const AdminAnalytics = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') return null;

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="gm-admin-container">
        <AdminSidebar active="analytics" />
        <div className="gm-admin-content">
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#0f172a' }}>Admin Analytics</h1>
          <p style={{ margin: 0, color: '#64748b', fontWeight: 500, marginBottom: 18 }}>
            Analytics cards and revenue calculations will be populated once analytics endpoints are added.
          </p>

          <div style={{ background: 'white', border: '1px solid var(--bdr)', borderRadius: 18, padding: 18 }}>
            <div style={{ color: '#64748b', fontWeight: 700 }}>
              Current backend does not provide global revenue aggregation.
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminAnalytics;

