import React, { useState } from 'react';
import CourseCard from '../components/CourseCard';
import useCourses from '../hooks/useCourses';

const Courses = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const { courses: allCourses } = useCourses();

  const filteredCourses = allCourses.filter(c => {
    const courseTag = `${c.catTag || c.category || c.cat || ''}`.toLowerCase();
    if (filter !== 'all' && !courseTag.includes(filter)) return false;
    if (search && !c.title?.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div>
      <div style={{ background: 'var(--bg2)', padding: '40px 5%', borderBottom: '1px solid var(--bdr)' }}>
        <div className="container">
          <div className="section-tag">📚 All Courses</div>
          <h1 style={{ fontFamily: 'var(--fnt)', fontSize: '2rem', fontWeight: 700, marginBottom: 8 }}>Explore Our Courses</h1>
          <p style={{ color: 'var(--txt2)' }}>500+ courses across 20+ categories. Find your perfect learning path.</p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 24 }}>
            <select onChange={e => setFilter(e.target.value)} style={{ padding: '9px 16px', border: '1.5px solid var(--bdr)', borderRadius: 8 }}>
              <option value="all">All Categories</option>
              <option value="web">Web Development</option>
              <option value="math">Mathematics</option>
              <option value="python">Python</option>
              <option value="data">Data Science</option>
            </select>
            <input type="search" placeholder="🔍 Search courses..." onChange={e => setSearch(e.target.value)} style={{ padding: '9px 16px', border: '1.5px solid var(--bdr)', borderRadius: 8, minWidth: 220 }} />
          </div>
        </div>
      </div>
      <div className="container" style={{ padding: '60px 0' }}>
        <div className="grid">{filteredCourses.map(course => <CourseCard key={course.id} course={course} />)}</div>
      </div>
    </div>
  );
};

export default Courses;