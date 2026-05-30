import React from 'react';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';

const AdminSettings = () => {
  const { user } = useAuth();

  if (!user || user.role !== 'admin') return null;

  return (
    <ProtectedRoute adminOnly={true}>
      <div style={{ background: '#f8fafc', minHeight: '90vh', padding: '32px 5%' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#0f172a' }}>Admin Settings</h1>
          <p style={{ margin: 0, color: '#64748b', fontWeight: 500, marginBottom: 18 }}>
            Manage profile and application settings.
          </p>

          <div style={{ background: 'white', border: '1px solid var(--bdr)', borderRadius: 18, padding: 18 }}>
            <div style={{ color: '#64748b', fontWeight: 700 }}>
              Settings forms are placeholders for now (no backend routes implemented).
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminSettings;

