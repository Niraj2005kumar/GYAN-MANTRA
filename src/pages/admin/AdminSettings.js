import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminSidebar from '../../components/admin/AdminSidebar';

const AdminSettings = () => {
  const { user } = useAuth();
  const [siteName, setSiteName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [firebaseInfo, setFirebaseInfo] = useState(null);
  const [cloudinaryInfo, setCloudinaryInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const response = await api.get('/admin/settings');
        const { settings, firebaseInfo, cloudinaryInfo } = response.data;
        setSiteName(settings.siteName || '');
        setSupportEmail(settings.supportEmail || '');
        setContactNumber(settings.contactNumber || '');
        setFirebaseInfo(firebaseInfo || null);
        setCloudinaryInfo(cloudinaryInfo || null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    loadSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setMessage('');

    try {
      const response = await api.put('/admin/settings', {
        siteName,
        supportEmail,
        contactNumber
      });
      setMessage(response.data.message || 'Settings saved successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="gm-admin-container">
        <AdminSidebar active="settings" />
        <div className="gm-admin-content">
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#0f172a' }}>Admin Settings</h1>
          <p style={{ margin: 0, color: '#64748b', fontWeight: 500, marginBottom: 18 }}>
            Update site details and review Firebase / Cloudinary configuration.
          </p>

          {loading ? (
            <div style={{ padding: 28, background: 'white', borderRadius: 18, border: '1px solid var(--bdr)' }}>Loading settings...</div>
          ) : (
            <div style={{ display: 'grid', gap: 18 }}>
              <div style={{ background: 'white', borderRadius: 18, border: '1px solid var(--bdr)', padding: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>Site Settings</h2>
                <div style={{ display: 'grid', gap: 12 }}>
                  <input
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    placeholder="Site Name"
                    style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
                  />
                  <input
                    value={supportEmail}
                    onChange={(e) => setSupportEmail(e.target.value)}
                    placeholder="Support Email"
                    style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
                  />
                  <input
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    placeholder="Contact Number"
                    style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
                  />
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    style={{ width: 'max-content', padding: '12px 18px', borderRadius: 12, border: 'none', background: '#4f46e5', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {saving ? 'Saving...' : 'Save Settings'}
                  </button>
                  {message && <div style={{ color: '#047857', fontWeight: 600 }}>{message}</div>}
                  {error && <div style={{ color: '#b91c1c', fontWeight: 700 }}>{error}</div>}
                </div>
              </div>

              <div style={{ display: 'grid', gap: 18, gridTemplateColumns: '1fr 1fr' }}>
                <div style={{ background: 'white', borderRadius: 18, border: '1px solid var(--bdr)', padding: 20 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>Admin Profile</h2>
                  <div style={{ color: '#64748b', fontSize: 14, marginBottom: 8 }}>Name</div>
                  <div style={{ marginBottom: 12, fontWeight: 700 }}>{user.name || 'Admin'}</div>
                  <div style={{ color: '#64748b', fontSize: 14, marginBottom: 8 }}>Email</div>
                  <div style={{ fontWeight: 700 }}>{user.email}</div>
                  <div style={{ color: '#64748b', fontSize: 14, marginTop: 12, marginBottom: 8 }}>Role</div>
                  <div style={{ fontWeight: 700 }}>{user.role}</div>
                </div>

                <div style={{ background: 'white', borderRadius: 18, border: '1px solid var(--bdr)', padding: 20 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>Firebase Info</h2>
                  <div style={{ color: '#64748b', fontSize: 14, marginBottom: 8 }}>Project ID</div>
                  <div style={{ fontWeight: 700 }}>{firebaseInfo?.projectId || 'N/A'}</div>
                  <div style={{ color: '#64748b', fontSize: 14, marginTop: 12, marginBottom: 8 }}>Mode</div>
                  <div style={{ fontWeight: 700 }}>{firebaseInfo?.mode || 'N/A'}</div>
                  <div style={{ color: '#64748b', fontSize: 14, marginTop: 12, marginBottom: 8 }}>Service Account</div>
                  <div style={{ fontWeight: 700 }}>{firebaseInfo?.serviceAccountConfigured ? 'Configured' : 'Not Configured'}</div>
                </div>
              </div>

              <div style={{ background: 'white', borderRadius: 18, border: '1px solid var(--bdr)', padding: 20 }}>
                <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 12 }}>Cloudinary Info</h2>
                <div style={{ color: '#64748b', fontSize: 14, marginBottom: 8 }}>Cloud Name</div>
                <div style={{ fontWeight: 700 }}>{cloudinaryInfo?.cloudName || 'N/A'}</div>
                <div style={{ color: '#64748b', fontSize: 14, marginTop: 12, marginBottom: 8 }}>API Key Status</div>
                <div style={{ fontWeight: 700 }}>{cloudinaryInfo?.apiKey || 'N/A'}</div>
                <div style={{ color: '#64748b', fontSize: 14, marginTop: 12, marginBottom: 8 }}>API Secret Status</div>
                <div style={{ fontWeight: 700 }}>{cloudinaryInfo?.apiSecret || 'N/A'}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminSettings;

