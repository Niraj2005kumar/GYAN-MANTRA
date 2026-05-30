import React from 'react';

const StudentTable = ({ students = [] }) => {
  return (
    <div style={{ background: 'white', border: '1px solid var(--bdr)', borderRadius: 18, overflow: 'hidden' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
            <th style={{ textAlign: 'left', padding: 14, color: '#0f172a' }}>Name</th>
            <th style={{ textAlign: 'left', padding: 14, color: '#0f172a' }}>Email</th>
            <th style={{ textAlign: 'left', padding: 14, color: '#0f172a' }}>Courses</th>
            <th style={{ textAlign: 'right', padding: 14, color: '#0f172a' }}>Progress</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id || s.firebaseId} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: 14, fontWeight: 900, color: '#0f172a' }}>{s.name}</td>
              <td style={{ padding: 14, color: '#64748b', fontWeight: 700 }}>{s.email}</td>
              <td style={{ padding: 14, color: '#64748b', fontWeight: 700 }}>{s.enrolledCourses?.length || 0}</td>
              <td style={{ padding: 14, textAlign: 'right', color: '#4f46e5', fontWeight: 900 }}>{s.progress ?? 0}%</td>
            </tr>
          ))}
          {students.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ padding: 18, color: '#64748b', fontWeight: 800 }}>
                No students.
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;

