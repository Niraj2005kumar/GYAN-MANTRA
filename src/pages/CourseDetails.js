import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolled, setEnrolled] = useState(false);
  const [error, setError] = useState('');
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      setError('');

      try {
        const courseRes = await api.get(`/courses/${id}`);
        setCourse(courseRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Unable to load course.');
      } finally {
        setLoading(false);
      }
    };
    loadCourse();
  }, [id]);

  useEffect(() => {
    const checkEnrollment = async () => {
      if (!user) {
        setEnrolled(false);
        return;
      }
      try {
        const dashboardRes = await api.get('/dashboard');
        const purchased = (dashboardRes.data.enrolledCourses || []).some((item) => item._id === id || item.id === id);
        setEnrolled(purchased);
      } catch (err) {
        console.error('Enrollment check failed:', err);
        setEnrolled(false);
      }
    };
    checkEnrollment();
  }, [user, id]);

  const handleEnroll = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setEnrolling(true);
    try {
      const res = await api.post('/dashboard/enroll', { courseId: id });
      setEnrolled(true);
      setError('');
      alert(res.data.message || 'You are enrolled!');
    } catch (err) {
      setError(err.response?.data?.message || 'Enroll failed.');
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Loading course details...</h2>
      </div>
    );
  }

  if (!course) {
    return (
      <div style={{ minHeight: '70vh', textAlign: 'center', padding: 40 }}>
        <h2>Course not found</h2>
        <Link to="/courses" style={{ marginTop: 20, display: 'inline-block', padding: '12px 20px', background: '#4f46e5', color: '#fff', borderRadius: 10, textDecoration: 'none' }}>Browse Courses</Link>
      </div>
    );
  }

  const parseDuration = (d) => {
    if (!d) return 0;
    const s = String(d).trim();
    const hoursMatch = s.match(/(\d+(?:\.\d+)?)\s*hours?/i);
    if (hoursMatch) return Math.round(parseFloat(hoursMatch[1]) * 3600);
    const minsMatch = s.match(/(\d+(?:\.\d+)?)\s*mins?/i);
    if (minsMatch) return Math.round(parseFloat(minsMatch[1]) * 60);
    if (s.includes(':')) {
      const parts = s.split(':').map(p => parseInt(p, 10) || 0);
      if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
      if (parts.length === 2) return parts[0] * 60 + parts[1];
    }
    const num = parseInt(s, 10);
    if (!isNaN(num)) return num;
    return 0;
  };

  const formatSeconds = (sec) => {
    if (!sec || sec <= 0) return '00:00';
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;
    if (hours > 0) return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const displayedDuration = course.duration && String(course.duration).trim() !== ''
    ? course.duration
    : (Array.isArray(course.videos) && course.videos.length > 0
      ? formatSeconds(course.videos.reduce((acc, v) => acc + parseDuration(v.duration), 0))
      : '00:00');

  return (
    <div style={{ minHeight: '90vh', padding: '40px 5%', background: '#f8fafc' }}>
      <div style={{ maxWidth: 1040, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 360px', gap: 24 }}>
        <div style={{ padding: 28, background: '#fff', borderRadius: 24, boxShadow: '0 10px 30px rgba(15,23,42,0.08)' }}>
          {course.thumbnail && (
            <div style={{ marginBottom: 18 }}>
              <img src={course.thumbnail} alt={course.title} style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 12 }} />
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#4f46e5', marginBottom: 10 }}>{course.cat || course.category || 'General'}</div>
              <h1 style={{ fontSize: '2.25rem', margin: 0 }}>{course.title}</h1>
              <p style={{ marginTop: 18, color: '#475569', lineHeight: 1.8 }}>{course.longDescription || course.description || 'A private course with secure Cloudinary video streaming.'}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, color: '#6b7280' }}>Instructor</div>
              <div style={{ marginTop: 10, fontSize: 18, fontWeight: 700 }}>{course.instructor || 'Instructor'}</div>
            </div>
          </div>

          <div style={{ marginTop: 32, display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 16 }}>
            {[
              { label: 'Duration', value: displayedDuration },
              { label: 'Price', value: course.price ? `?${course.price}` : 'Free' },
              { label: 'Lessons', value: course.videos?.length || 0 }
            ].map((item) => (
              <div key={item.label} style={{ padding: 18, borderRadius: 20, background: '#f8fafc', color: '#0f172a' }}>
                <div style={{ fontSize: 13, color: '#64748b', textTransform: 'uppercase', marginBottom: 8 }}>{item.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{item.value}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 30 }}>
            <h3 style={{ marginBottom: 16 }}>What you will learn</h3>
            <ul style={{ display: 'grid', gap: 12, listStyle: 'none', padding: 0, margin: 0 }}>
              {(course.highlights || ['Secure playback', 'Protected streams', 'Full access after purchase']).map((text, index) => (
                <li key={index} style={{ display: 'flex', gap: 12, alignItems: 'center', color: '#475569' }}><span style={{ fontSize: 20 }}>�</span><span>{text}</span></li>
              ))}
            </ul>
          </div>
        </div>

        <aside style={{ padding: 28, background: '#fff', borderRadius: 24, boxShadow: '0 10px 30px rgba(15,23,42,0.08)' }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#4f46e5' }}>Secure Access</div>
            <div style={{ marginTop: 12, color: '#334155' }}>{enrolled ? 'You have access to video playback.' : 'Purchase required to unlock lessons.'}</div>
          </div>

          {error && <div style={{ marginBottom: 18, color: '#dc2626' }}>{error}</div>}

          <button onClick={handleEnroll} disabled={enrolling || enrolled} style={{ width: '100%', padding: '14px 18px', borderRadius: 14, border: 'none', cursor: 'pointer', background: enrolled ? '#10b981' : '#4f46e5', color: '#fff', fontWeight: 700 }}>
            {enrolled ? 'Enrolled' : enrolling ? 'Processing...' : 'Buy / Enroll'}
          </button>

          {enrolled && (
            <button onClick={() => navigate(`/course-player/${id}`)} style={{ marginTop: 16, width: '100%', padding: '14px 18px', borderRadius: 14, border: '1px solid #cbd5e1', background: '#fff', color: '#0f172a', cursor: 'pointer', fontWeight: 700 }}>
              Go to course player
            </button>
          )}

          <div style={{ marginTop: 28 }}>
            <h4 style={{ marginBottom: 12 }}>Lesson preview</h4>
            <div style={{ display: 'grid', gap: 12 }}>
              {(course.videos || []).slice(0, 5).map((video, index) => (
                <div key={index} style={{ padding: 14, borderRadius: 14, background: '#f8fafc', color: '#334155' }}>
                  <div style={{ fontWeight: 700 }}>{video.title || `Lesson ${index + 1}`}</div>
                  <div style={{ marginTop: 6, fontSize: 13, color: '#64748b' }}>{video.duration || '00:00'}</div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseDetails;
