import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [stats, setStats] = useState({ totalCourses: 0, completedCourses: 0, averageProgress: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      if (!user) {
        setEnrolledCourses([]);
        setStats({ totalCourses: 0, completedCourses: 0, averageProgress: 0 });
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await api.get('/dashboard');
        setEnrolledCourses(response.data.enrolledCourses || []);
        setStats(response.data.stats || { totalCourses: 0, completedCourses: 0, averageProgress: 0 });
      } catch (err) {
        console.error('Dashboard load error:', err);
        setEnrolledCourses([]);
        setStats({ totalCourses: 0, completedCourses: 0, averageProgress: 0 });
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [user]);

  const handleContinue = (course) => {
    navigate(`/course-player/${course._id || course.id}`);
  };

  const handleCourses = () => {
    navigate('/courses');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '90vh', background: '#f8fafc', padding: '40px 5%' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gap: 24 }}>
        <div style={{ padding: 28, background: '#fff', borderRadius: 24, boxShadow: '0 15px 40px rgba(15,23,42,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
            <div>
              <h1 style={{ margin: 0 }}>Student Dashboard</h1>
              <p style={{ color: '#475569', marginTop: 8 }}>Welcome back, {user?.name || 'student'} — here is your course progress.</p>
            </div>
            <button onClick={handleCourses} style={{ padding: '12px 18px', borderRadius: 12, background: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer' }}>Browse courses</button>
          </div>
          <div style={{ marginTop: 28, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            <div style={{ padding: 20, background: '#f8fafc', borderRadius: 20 }}>
              <div style={{ color: '#64748b', marginBottom: 8 }}>Enrolled Courses</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#0f172a' }}>{stats.totalCourses}</div>
            </div>
            <div style={{ padding: 20, background: '#f8fafc', borderRadius: 20 }}>
              <div style={{ color: '#64748b', marginBottom: 8 }}>Average Progress</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#0f172a' }}>{stats.averageProgress}%</div>
            </div>
            <div style={{ padding: 20, background: '#f8fafc', borderRadius: 20 }}>
              <div style={{ color: '#64748b', marginBottom: 8 }}>Completed Courses</div>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#0f172a' }}>{stats.completedCourses}</div>
            </div>
          </div>
        </div>

        <div style={{ padding: 28, background: '#fff', borderRadius: 24, boxShadow: '0 15px 40px rgba(15,23,42,0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ margin: 0 }}>My Courses</h2>
            <span style={{ color: '#64748b' }}>{enrolledCourses.length} courses</span>
          </div>
          {enrolledCourses.length === 0 ? (
            <div style={{ padding: 40, textAlign: 'center', color: '#475569' }}>
              <p>You are not enrolled in any courses yet.</p>
              <button onClick={handleCourses} style={{ marginTop: 16, padding: '12px 18px', borderRadius: 12, background: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer' }}>Browse courses</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              {enrolledCourses.map((course) => (
                <div key={course._id || course.id} style={{ padding: 20, borderRadius: 20, background: '#f8fafc', display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{course.title}</div>
                    <div style={{ color: '#64748b', fontSize: 14 }}>{course.description?.slice(0, 120) || 'No description available'}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ marginBottom: 8, color: '#0f172a', fontWeight: 700 }}>{course.progress ?? 0}%</div>
                    <button onClick={() => handleContinue(course)} style={{ padding: '10px 16px', borderRadius: 12, background: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer' }}>Continue</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
