import React from 'react';

const StatsCard = ({ title, value, subtitle }) => {
  return (
    <div style={{ padding: 20, background: '#f8fafc', borderRadius: 20, border: '1px solid #e2e8f0' }}>
      <div style={{ color: '#64748b', fontWeight: 800, marginBottom: 8 }}>{title}</div>
      <div style={{ fontSize: 32, fontWeight: 900, color: '#0f172a' }}>{value ?? 0}</div>
      {subtitle ? <div style={{ color: '#94a3b8', marginTop: 6, fontWeight: 700, fontSize: 13 }}>{subtitle}</div> : null}
    </div>
  );
};

export default StatsCard;

