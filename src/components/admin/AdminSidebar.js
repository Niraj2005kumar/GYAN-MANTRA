import React, { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminSidebar = ({ active }) => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const items = useMemo(
    () => [
      { key: 'dashboard', label: 'Dashboard', to: '/admin/dashboard' },
      { key: 'courses', label: 'Courses', to: '/admin/courses' },
      { key: 'students', label: 'Students', to: '/admin/students' },
      { key: 'analytics', label: 'Analytics', to: '/admin/analytics' },
      { key: 'settings', label: 'Settings', to: '/admin/settings' },
    ],
    []
  );

  const currentKey = active ||
    items.find((i) => location.pathname.startsWith(i.to))?.key ||
    (location.pathname.startsWith('/admin/upload') ? 'upload' : 'dashboard');

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      {/* Desktop */}
      <aside
        style={{
          position: 'fixed',
          left: 0,
          top: 68,
          bottom: 0,
          width: 260,
          background: 'rgba(255,255,255,0.92)',
          borderRight: '1px solid #e2e8f0',
          padding: 18,
          zIndex: 1000,
          display: 'none',
        }}
        className="gm-admin-sidebar-desktop"
      >
        <div style={{ fontWeight: 900, color: '#0f172a', marginBottom: 14, fontSize: 18 }}>Admin</div>
        <nav style={{ display: 'grid', gap: 8 }}>
          {items.map((item) => {
            const isActive = currentKey === item.key;
            return (
              <Link
                key={item.key}
                to={item.to}
                onClick={() => setOpen(false)}
                style={{
                  textDecoration: 'none',
                  padding: '10px 12px',
                  borderRadius: 14,
                  fontWeight: 800,
                  color: isActive ? 'white' : '#334155',
                  background: isActive ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : 'transparent',
                  border: isActive ? 'none' : '1px solid #e2e8f0',
                }}
              >
                {item.label}
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            style={{
              marginTop: 10,
              background: 'transparent',
              border: '1px solid #e2e8f0',
              padding: '10px 12px',
              borderRadius: 14,
              cursor: 'pointer',
              fontWeight: 900,
              color: '#0f172a',
            }}
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Mobile/Tablet */}
      <div className="gm-admin-sidebar-mobile">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 900, color: '#0f172a', fontSize: 16 }}>Admin Panel</div>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            style={{
              padding: '8px 14px',
              borderRadius: 10,
              border: '1px solid #cbd5e1',
              background: '#f8fafc',
              fontWeight: 800,
              cursor: 'pointer',
              color: '#334155'
            }}
          >
            {open ? '✕ Close' : '☰ Menu'}
          </button>
        </div>

        {open && (
          <div style={{ position: 'fixed', left: 12, right: 12, top: 80, background: 'white', borderRadius: 18, border: '1px solid #e2e8f0', padding: 12, zIndex: 1200, boxShadow: '0 20px 40px rgba(15,23,42,0.12)' }}>
            <div style={{ fontWeight: 900, color: '#0f172a', marginBottom: 10, fontSize: 16 }}>Admin</div>
            <nav style={{ display: 'grid', gap: 8 }}>
              {items.map((item) => {
                const isActive = currentKey === item.key;
                return (
                  <Link
                    key={item.key}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    style={{
                      textDecoration: 'none',
                      padding: '10px 12px',
                      borderRadius: 14,
                      fontWeight: 800,
                      color: isActive ? 'white' : '#334155',
                      background: isActive ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : 'transparent',
                      border: isActive ? 'none' : '1px solid #e2e8f0',
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <button
                onClick={() => {
                  setOpen(false);
                  handleLogout();
                }}
                style={{
                  background: 'transparent',
                  border: '1px solid #e2e8f0',
                  padding: '10px 12px',
                  borderRadius: 14,
                  cursor: 'pointer',
                  fontWeight: 900,
                  color: '#0f172a',
                }}
              >
                Logout
              </button>
            </nav>
          </div>
        )}
      </div>

      {/* Responsive CSS */}
      <style>{`
        .gm-admin-container {
          display: flex;
          flex-direction: column;
          min-height: 90vh;
          background: #f8fafc;
        }
        .gm-admin-content {
          flex: 1;
          padding: 32px 5%;
          max-width: 1280px;
          margin-left: 0;
          box-sizing: border-box;
        }
        .gm-admin-sidebar-desktop { display: none; }
        .gm-admin-sidebar-mobile { 
          display: block; 
          padding: 16px 5%; 
          background: white; 
          border-bottom: 1px solid #e2e8f0; 
          position: sticky;
          top: 68px;
          z-index: 998;
        }
        @media (min-width: 1024px) {
          .gm-admin-sidebar-desktop { display: block !important; }
          .gm-admin-sidebar-mobile { display: none !important; }
          .gm-admin-content {
            margin-left: 260px !important;
          }
          .gm-admin-container {
            flex-direction: row;
          }
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;

