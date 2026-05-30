import React from 'react';

const AdminNavbar = ({ title }) => {
  return (
    <div
      style={{
        position: 'sticky',
        top: 68,
        zIndex: 900,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e2e8f0',
        padding: '14px 5%',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 900, color: '#0f172a' }}>{title || 'Admin Panel'}</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>Manage courses and students</div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;

