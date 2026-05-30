import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div className="card" onClick={() => navigate(`/course/${course.id}`)}>
      <div style={{ height: 180, background: `linear-gradient(135deg, ${course.color})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', position: 'relative' }}>
        <span>{course.emoji}</span>
        {course.badge && <div style={{ position: 'absolute', top: 12, left: 12, background: 'var(--acc)', color: '#fff', fontSize: '0.68rem', fontWeight: 700, padding: '4px 10px', borderRadius: 100 }}>{course.badge}</div>}
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ fontSize: '0.72rem', color: 'var(--c3)', fontWeight: 600, marginBottom: 8 }}>{course.cat}</div>
        <h3 style={{ fontFamily: 'var(--fnt)', fontSize: '1rem', fontWeight: 700, marginBottom: 8 }}>{course.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', background: `linear-gradient(135deg, var(--c3), var(--c2))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', fontWeight: 700, color: '#fff' }}>{course.instructorInitials}</div>
          <span style={{ fontSize: '0.8rem', color: 'var(--txt2)' }}>{course.instructor}</span>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--txt3)', marginBottom: 14 }}>{course.description.substring(0, 80)}...</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', fontWeight: 600, color: 'var(--acc)' }}>
            {'★'.repeat(Math.floor(course.rating))} {course.rating} <span style={{ color: 'var(--txt2)', fontWeight: 400 }}>({course.reviews})</span>
          </div>
          <span style={{ fontSize: '0.78rem', color: 'var(--txt3)' }}>⏱ {course.duration}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 14, borderTop: '1px solid var(--bdr)' }}>
          <div><span style={{ fontFamily: 'var(--fnt)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--c1)' }}>₹{course.price}</span><span style={{ fontSize: '0.85rem', color: 'var(--txt3)', textDecoration: 'line-through', marginLeft: 6 }}>₹{course.oldPrice}</span></div>
          <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem' }}>Enroll →</button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;