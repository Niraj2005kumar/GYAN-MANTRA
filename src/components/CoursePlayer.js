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

  useEffect(() => {
    const loadCourse = async () => {
      setLoading(true);
      setError('');
      setVideoURL('');

      try {
        const courseResponse = await api.get(`/courses/${id}`);
        setCourse(courseResponse.data);

        if (!user) {
          setError('Please log in to access this course.');
          return;
        }

        const videoResponse = await api.get(`/video/${id}?lessonIndex=${currentLesson}`);
        setVideoURL(videoResponse.data.url);
        setIsEnrolled(true);
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
    <div style={{ minHeight: '100vh', background: '#0f172a', color: '#fff', padding: '20px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, marginBottom: 24 }}>
          <h1>{course?.title || 'Course Player'}</h1>
          <button onClick={() => navigate('/dashboard')} style={{ background: '#4f46e5', color: 'white', padding: '10px 16px', borderRadius: 10, border: 'none', cursor: 'pointer' }}>
            Back to Dashboard
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>
          <div>
            <div style={{ background: '#111827', borderRadius: 20, overflow: 'hidden', minHeight: 220 }}>
              {videoURL ? (
                <video src={videoURL} controls autoPlay style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <div style={{ padding: 40, textAlign: 'center', color: '#cbd5e1' }}>Video unavailable.</div>
              )}
            </div>

            <div style={{ marginTop: 20, padding: 20, background: '#111827', borderRadius: 20 }}>
              <h2>{currentLessonData.title || `Lesson ${currentLesson + 1}`}</h2>
              <p style={{ color: '#9ca3af' }}>{currentLessonData.duration || 'Unknown duration'}</p>
              <p style={{ marginTop: 12, color: '#d1d5db' }}>{course?.description || 'Private course video playback through backend.'}</p>
            </div>
          </div>

          <div style={{ background: '#111827', borderRadius: 20, padding: 20, maxHeight: 'calc(100vh - 120px)', overflowY: 'auto' }}>
            <h3 style={{ marginBottom: 16 }}>Lessons</h3>
            <div style={{ display: 'grid', gap: 12 }}>
              {lessons.map((lesson, index) => (
                <button
                  key={index}
                  onClick={() => handleLessonClick(index)}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                    padding: 14,
                    borderRadius: 14,
                    border: '1px solid #1f2937',
                    background: currentLesson === index ? '#4f46e5' : '#111827',
                    color: currentLesson === index ? '#fff' : '#d1d5db',
                    cursor: 'pointer'
                  }}
                >
                  <span>{lesson.title || `Lesson ${index + 1}`}</span>
                  <span style={{ fontSize: 12 }}>{lesson.duration || '00:00'}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePlayer;
