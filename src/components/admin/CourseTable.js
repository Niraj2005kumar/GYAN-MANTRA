import React from 'react';

const CourseTable = ({ courses = [] }) => {
  return (
    <div style={{ background: 'white', border: '1px solid var(--bdr)', borderRadius: 18, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <th style={{ textAlign: 'left', padding: 14, color: '#0f172a' }}>Course</th>
            <th style={{ textAlign: 'left', padding: 14, color: '#0f172a' }}>Category</th>
            <th style={{ textAlign: 'right', padding: 14, color: '#0f172a' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((c) => (
            <tr key={c._id || c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: 14, fontWeight: 800, color: '#0f172a' }}>{c.title}</td>
              <td style={{ padding: 14, color: '#64748b', fontWeight: 700 }}>{c.category || '—'}</td>
              <td style={{ padding: 14, textAlign: 'right', fontWeight: 900, color: '#4f46e5' }}>{c.price ?? ''}</td>
            </tr>
          ))}
          {courses.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ padding: 18, color: '#64748b', fontWeight: 800 }}>
                No courses.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;

