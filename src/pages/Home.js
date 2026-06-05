import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCourses from '../hooks/useCourses';
import { useAuth } from '../context/AuthContext';
import api from '../api';

const Home = () => {
  const { courses, loading } = useCourses();
  const featuredCourses = courses.slice(0, 3);
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchEnrollments = async () => {
      if (user) {
        try {
          const response = await api.get('/dashboard');
          setEnrollments(response.data.enrolledCourses || []);
        } catch (error) {
          console.error('Error fetching enrollments:', error);
          setEnrollments([]);
        }
      } else {
        setEnrollments([]);
      }
    };
    fetchEnrollments();
  }, [user]);

  const showDoubtSolveButton = user && enrollments && enrollments.length > 0;

  const feedbackHighlights = [
    { icon: '🎯', text: 'Course content centered on real-world skills.' },
    { icon: '📚', text: 'Lessons designed for steady learning progress.' },
    { icon: '🚀', text: 'Clear paths to build practical knowledge.' }
  ];

  const instructorHighlights = [
    {
      title: 'Class 8th–12th Education',
      subtitle: 'Complete syllabus coverage with expert guidance.'
    },
    {
      title: 'JEE Main & Advanced',
      subtitle: 'Concept-based preparation with regular practice.'
    },
    {
      title: 'NDA Preparation',
      subtitle: 'Focused training for NDA written examination.'
    },
    {
      title: 'Mock Tests & Performance',
      subtitle: 'Track progress and improve exam readiness.'
    }
  ];

  return (
    <div>
      {/* ========== HERO SECTION ========== */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b, #312e81, #4c1d95)',
        color: 'white',
        padding: '80px 5%',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          alignItems: 'center'
        }}>
          {/* Left side - Text Content */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{
              display: 'inline-block',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '50px',
              padding: '8px 20px',
              fontSize: '14px',
              marginBottom: '20px'
            }}>
              🎓 Class 5th–12th | JEE & NDA Academy
            </div>

            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 'bold',
              marginBottom: '20px',
              lineHeight: '1.2'
            }}>
              Master School Education &{' '}
              <span style={{ color: '#fbbf24' }}>JEE | NDA</span>
              <br />Preparation
            </h1>

            <p style={{
              fontSize: '18px',
              opacity: 0.9,
              marginBottom: '30px',
              lineHeight: '1.6'
            }}>
              Complete courses for Class 5th to 12th along with
              JEE Main, JEE Advanced, and NDA preparation with
              expert guidance and regular mock tests.
            </p>

            <style>{`
              @media (max-width: 480px) {
                .hero-buttons-container {
                  flex-direction: column !important;
                  width: 100% !important;
                }
                .hero-buttons-container > a,
                .hero-buttons-container > button {
                  width: 100% !important;
                }
                .hero-buttons-container button {
                  width: 100% !important;
                  display: block !important;
                  text-align: center !important;
                }
              }
            `}</style>
            <div className="hero-buttons-container" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <Link to="/courses">
                <button style={{
                  background: '#f59e0b',
                  color: 'white',
                  border: 'none',
                  padding: '14px 32px',
                  borderRadius: '50px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}>
                  Browse Courses →
                </button>
              </Link>

              <Link to="/signup">
                <button style={{
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)',
                  padding: '14px 32px',
                  borderRadius: '50px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}>
                  Start Learning
                </button>
              </Link>

              <button
                onClick={() => window.open("https://forms.gle/XimsntPNKubEdvaNA", "_blank")}
                style={{
                  background: 'rgba(167, 139, 250, 0.1)',
                  color: 'white',
                  border: '2px solid #a78bfa',
                  padding: '14px 32px',
                  borderRadius: '50px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, background-color 0.2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.backgroundColor = 'rgba(167, 139, 250, 0.2)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.backgroundColor = 'rgba(167, 139, 250, 0.1)';
                }}
              >
                Career Counselling
              </button>

              {showDoubtSolveButton && (
                <button
                  onClick={() => window.open("https://chat.whatsapp.com/+91 8383008436", "_blank")}
                  style={{
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    padding: '14px 32px',
                    borderRadius: '50px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(16, 185, 129, 0.5)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  Doubt Solve
                </button>
              )}
            </div>

            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
              <div><span style={{ fontSize: '28px', fontWeight: 'bold', color: '#fbbf24' }}>Class 5th–12th</span><br />Complete Syllabus</div>
              <div><span style={{ fontSize: '28px', fontWeight: 'bold', color: '#fbbf24' }}>JEE Main & Advanced</span><br />Preparation</div>
              <div><span style={{ fontSize: '28px', fontWeight: 'bold', color: '#fbbf24' }}>NDA</span><br />Preparation</div>
              <div><span style={{ fontSize: '28px', fontWeight: 'bold', color: '#fbbf24' }}>Mock Test</span><br />Performance</div>
            </div>
          </div>

          {/* Right side - Card */}
          <div style={{
            flex: 1,
            minWidth: '280px',
            background: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            padding: '30px',
            border: '1px solid rgba(255,255,255,0.2)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                background: 'linear-gradient(135deg, #f59e0b, #ea580c)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '18px'
              }}>GM</div>
              <div>
                <h4 style={{ margin: 0 }}>Exam Preparation</h4>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>Structured preparation for every student.</p>
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '10px', height: '8px', marginBottom: '10px' }}>
              <div style={{ width: '68%', height: '100%', background: 'linear-gradient(90deg, #f59e0b, #10b981)', borderRadius: '10px' }}></div>
            </div>
            <p style={{ fontSize: '14px', marginBottom: '20px' }}>Structured learning with measurable progress and clear outcomes.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.08)', padding: '10px', borderRadius: '10px' }}>
                <span style={{ fontSize: '20px' }}>✅</span>
                <div><strong>Complete Syllabus</strong><br /><span style={{ fontSize: '12px' }}>Class 5th to 12th</span></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.08)', padding: '10px', borderRadius: '10px' }}>
                <span style={{ fontSize: '20px' }}>▶️</span>
                <div><strong>Daily Practice Tests</strong><br /><span style={{ fontSize: '12px' }}>Improve Every Day</span></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.08)', padding: '10px', borderRadius: '10px' }}>
                <span style={{ fontSize: '20px' }}>📈</span>
                <div><strong>Performance Analysis</strong><br /><span style={{ fontSize: '12px' }}>Track Your Progress</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========== POPULAR COURSES SECTION ========== */}
      <div style={{ padding: '80px 5%', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
            <div>
              <span style={{ background: '#e0e7ff', color: '#4f46e5', padding: '5px 15px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' }}>🔥 Most Popular</span>
              <h2 style={{ fontSize: '32px', marginTop: '15px', marginBottom: '10px' }}>Trending <span style={{ color: '#4f46e5' }}>Courses</span></h2>
              <p style={{ color: '#666' }}>Explore our most-enrolled courses</p>
            </div>
            <Link to="/courses">
              <button style={{ background: 'transparent', border: '1px solid #cbd5e1', padding: '10px 24px', borderRadius: '50px', cursor: 'pointer' }}>View All Courses →</button>
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {featuredCourses.map(course => (
              <div key={course.id} style={{
                background: 'white',
                borderRadius: '20px',
                overflow: 'hidden',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <img src={course.thumbnail || `https://picsum.photos/seed/${course.id}/300/200`} alt={course.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '20px' }}>
                  {course.badge && (
                    <span style={{ background: '#fef3c7', color: '#d97706', padding: '3px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: 'bold' }}>{course.badge}</span>
                  )}
                  <h3 style={{ marginTop: '10px', marginBottom: '8px', fontSize: '18px' }}>{course.title}</h3>
                  <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>{course.instructor || 'Instructor'}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ color: '#f59e0b' }}>⭐ {course.rating || 0}</span>
                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#4f46e5' }}>{course.price ? `₹${course.price}` : 'Free'}</span>
                  </div>
                  <Link to={`/course/${course.id}`}>
                    <button style={{
                      width: '100%',
                      background: '#4f46e5',
                      color: 'white',
                      border: 'none',
                      padding: '12px',
                      borderRadius: '50px',
                      cursor: 'pointer',
                      fontWeight: 'bold'
                    }}>Enroll Now</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== TESTIMONIALS SECTION ========== */}
      <div style={{ padding: '80px 5%', background: '#f8fafc' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ background: '#e0e7ff', color: '#4f46e5', padding: '5px 15px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' }}>🏆 Why Choose Gyan Maantra</span>
            <h2 style={{ fontSize: '32px', marginTop: '15px' }}>Why Students Choose <span style={{ color: '#4f46e5' }}>Gyan Maantra</span></h2>
            <p style={{ color: '#475569' }}>Expert guidance, structured learning, and regular practice
              for Class 5th–12th, JEE Main, JEE Advanced, and NDA aspirants.</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {feedbackHighlights.map((item, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }}>
                <div style={{ fontSize: '40px', color: '#c7d2fe', marginBottom: '15px' }}>{item.icon}</div>
                <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '20px' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== INSTRUCTORS SECTION ========== */}
      <div style={{ padding: '80px 5%', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ background: '#e0e7ff', color: '#4f46e5', padding: '5px 15px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' }}>👨‍🏫 Expert Faculty</span>
            <h2 style={{ fontSize: '32px', marginTop: '15px' }}>Learn from Expert <span style={{ color: '#4f46e5' }}>Educators</span></h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            {instructorHighlights.map((inst, i) => (
              <div key={i} style={{
                textAlign: 'center',
                background: '#f8fafc',
                borderRadius: '20px',
                padding: '30px',
                transition: 'transform 0.3s'
              }}>
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  borderRadius: '50%',
                  margin: '0 auto 15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '24px',
                  fontWeight: 'bold'
                }}>{inst.title.charAt(0)}</div>
                <h3 style={{ marginBottom: '5px' }}>{inst.title}</h3>
                <p style={{ color: '#4f46e5', marginBottom: '15px' }}>{inst.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== CALL TO ACTION SECTION ========== */}
      <div style={{
        background: 'linear-gradient(135deg, #1e1b4b, #312e81)',
        padding: '80px 5%',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <span style={{ background: 'rgba(255,255,255,0.15)', padding: '5px 15px', borderRadius: '50px', fontSize: '12px', display: 'inline-block', marginBottom: '20px' }}>🎓 Start Your Learning Journey </span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '15px' }}>Start Your<span style={{ color: '#fbbf24' }}> Journey</span> to Success</h2>
          <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '30px' }}>Join thousands of students preparing for
            Class 8th–12th, JEE Main, JEE Advanced & NDA.</p>
          <Link to="/signup">
            <button style={{
              background: '#f59e0b',
              color: 'white',
              border: 'none',
              padding: '16px 48px',
              borderRadius: '50px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>Enroll Now 🚀</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;