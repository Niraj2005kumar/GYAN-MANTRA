import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const CoursePlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [videoURL, setVideoURL] = useState('');
  const [currentLesson, setCurrentLesson] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEnrolled, setIsEnrolled] = useState(false);
  
  // Progress states
  const [progress, setProgress] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      setError('');
      setVideoURL('');

      try {
        const courseResponse = await api.get(`/courses/${id}`);
        setCourse(courseResponse.data);
        const total = courseResponse.data.videos?.length || 0;

        if (!user) {
          setError('Please log in to access this course.');
          return;
        }

        const videoResponse = await api.get(`/video/${id}?lessonIndex=${currentLesson}`);
        setVideoURL(videoResponse.data.url);
        setIsEnrolled(true);

        // Fetch enrollment progress to set checkbox states
        const dashboardResponse = await api.get('/dashboard');
        const enrollment = (dashboardResponse.data.enrolledCourses || []).find((item) => item._id === id || item.id === id);
        if (enrollment) {
          const currentProgress = enrollment.progress || 0;
          setProgress(currentProgress);
          // Distribute completed lessons based on progress percentage
          const completedCount = Math.round((currentProgress / 100) * total);
          const completedList = [];
          for (let i = 0; i < completedCount; i++) {
            completedList.push(i);
          }
          setCompletedLessons(completedList);
        }

      } catch (err) {
        const message = err.response?.data?.message || 'Access denied or course not found.';
        setError(message);
        setIsEnrolled(false);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [id, user, currentLesson]);

  const handleLessonClick = (index) => {
    if (!course?.videos?.[index]) return;
    setCurrentLesson(index);
  };

  const handleToggleComplete = async () => {
    const total = course?.videos?.length || 0;
    if (total === 0) return;

    let nextCompleted;
    if (completedLessons.includes(currentLesson)) {
      nextCompleted = completedLessons.filter(idx => idx !== currentLesson);
    } else {
      nextCompleted = [...completedLessons, currentLesson];
    }

    // Ensure we don't exceed 100% and keep progress correct
    const newProgress = Math.min(100, Math.round((nextCompleted.length / total) * 100));
    setCompletedLessons(nextCompleted);
    setProgress(newProgress);

    try {
      await api.put('/dashboard/progress', { courseId: id, progress: newProgress });
    } catch (err) {
      console.error('Failed to save progress to backend:', err);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px' }}>
        <h2>Loading course player...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ minHeight: '70vh', padding: '40px', textAlign: 'center' }}>
        <h2>Access Error</h2>
        <p>{error}</p>
        {!user ? (
          <button onClick={() => navigate('/login')} style={{ marginTop: 20, padding: '10px 18px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer' }}>
            Login to continue
          </button>
        ) : (
          <button onClick={() => navigate(`/course/${id}`)} style={{ marginTop: 20, padding: '10px 18px', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 10, cursor: 'pointer' }}>
            View Course Details
          </button>
        )}
      </div>
    );
  }

  const lessons = course?.videos || [];
  const currentLessonData = lessons[currentLesson] || {};

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#fff', padding: '16px 4%' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
          <h1 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.875rem)', margin: 0 }}>{course?.title || 'Course Player'}</h1>
          <button onClick={() => navigate('/dashboard')} style={{ background: '#4f46e5', color: 'white', padding: '10px 16px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)' }}>
            Back to Dashboard
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ background: '#111827', borderRadius: 20, overflow: 'hidden', aspectRatio: '16/9', border: '1px solid #1e293b', boxShadow: '0 10px 25px rgba(0,0,0,0.3)' }}>
              {videoURL ? (
                <video src={videoURL} controls autoPlay style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#cbd5e1', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Video unavailable.</div>
              )}
            </div>

            <div style={{ marginTop: 20, padding: 'clamp(16px, 4vw, 20px)', background: '#111827', borderRadius: 20, border: '1px solid #1e293b' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <h2 style={{ margin: 0, fontSize: 'clamp(1rem, 3vw, 1.25rem)' }}>{currentLessonData.title || `Lesson ${currentLesson + 1}`}</h2>
                  <p style={{ color: '#9ca3af', margin: '8px 0 0 0', fontSize: 'clamp(0.8rem, 1.5vw, 0.875rem)' }}>Duration: {currentLessonData.duration || '00:00'}</p>
                </div>
                <button
                  onClick={handleToggleComplete}
                  style={{
                    padding: 'clamp(8px, 2vw, 10px) clamp(12px, 3vw, 16px)',
                    background: completedLessons.includes(currentLesson) ? '#10b981' : '#4f46e5',
                    color: '#fff',
                    border: 'none',
                    borderRadius: 10,
                    cursor: 'pointer',
                    fontWeight: 700,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {completedLessons.includes(currentLesson) ? '✓ Completed' : 'Mark Done'}
                </button>
              </div>
              <p style={{ marginTop: 16, color: '#cbd5e1', lineHeight: 1.6, fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)' }}>{course?.description || 'Private course video playback through backend.'}</p>
            </div>
          </div>

          <div style={{ background: '#111827', borderRadius: 20, padding: 'clamp(16px, 3vw, 20px)', border: '1px solid #1e293b', maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
            <div style={{ borderBottom: '1px solid #1e293b', paddingBottom: 14, marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontSize: 'clamp(0.9rem, 2vw, 1.125rem)' }}>Lessons</h3>
              <div style={{ marginTop: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'clamp(0.7rem, 1.2vw, 0.75rem)', color: '#94a3b8', marginBottom: 4, fontWeight: 700 }}>
                  <span>PROGRESS</span>
                  <span>{progress}%</span>
                </div>
                <div style={{ height: 6, background: '#1e293b', borderRadius: 3 }}>
                  <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg, #10b981, #059669)', borderRadius: 3 }}></div>
                </div>
              </div>
            </div>
            
            <div style={{ display: 'grid', gap: 10 }}>
              {lessons.map((lesson, index) => {
                const isCompleted = completedLessons.includes(index);
                return (
                  <button
                    key={index}
                    onClick={() => handleLessonClick(index)}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                      padding: 'clamp(10px, 2vw, 14px)',
                      borderRadius: 14,
                      border: '1px solid #1f2937',
                      background: currentLesson === index ? '#4f46e5' : '#1e293b',
                      color: currentLesson === index ? '#fff' : '#d1d5db',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontSize: 'clamp(0.8rem, 1.5vw, 0.875rem)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                      <span style={{ 
                        color: isCompleted ? '#10b981' : (currentLesson === index ? 'white' : '#64748b'),
                        fontSize: 16,
                        flexShrink: 0
                      }}>
                        {isCompleted ? '✓' : '○'}
                      </span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lesson.title || `Lesson ${index + 1}`}</span>
                    </div>
                    <span style={{ fontSize: 'clamp(0.7rem, 1.2vw, 0.75rem)', opacity: 0.8, flexShrink: 0, marginLeft: 8 }}>{lesson.duration || '00:00'}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
