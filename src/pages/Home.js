import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // Sample courses data (inline for simplicity)
  const featuredCourses = [
    {
      id: 1,
      title: 'Full Stack Web Development',
      instructor: 'Rahul Pathak',
      price: 1499,
      rating: 4.9,
      students: 12480,
      image: 'https://picsum.photos/id/0/300/200',
      badge: 'Bestseller'
    },
    {
      id: 2,
      title: 'Python Programming Mastery',
      instructor: 'Vikram Anand',
      price: 799,
      rating: 4.8,
      students: 8120,
      image: 'https://picsum.photos/id/1/300/200',
      badge: 'Popular'
    },
    {
      id: 3,
      title: 'Mathematics for GATE',
      instructor: 'Dr. Meera Nair',
      price: 999,
      rating: 4.9,
      students: 6240,
      image: 'https://picsum.photos/id/20/300/200',
      badge: 'Top Rated'
    }
  ];

  const testimonials = [
    {
      text: "This platform changed my career! The courses are excellent and instructors are very supportive.",
      author: "Arjun Sharma",
      role: "Software Engineer",
      rating: 5,
      initial: "AS"
    },
    {
      text: "Best online learning platform in India. The GATE preparation course helped me crack the exam.",
      author: "Priya Mehta",
      role: "GATE Qualified",
      rating: 5,
      initial: "PM"
    },
    {
      text: "Very affordable and high-quality content. The Python course is amazing!",
      author: "Rahul Verma",
      role: "Data Analyst",
      rating: 5,
      initial: "RV"
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
              🎓 India's #1 EdTech Platform
            </div>
            
            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              fontWeight: 'bold',
              marginBottom: '20px',
              lineHeight: '1.2'
            }}>
              Learn Programming &{' '}
              <span style={{ color: '#fbbf24' }}>Mathematics</span>
              <br />from Experts
            </h1>
            
            <p style={{
              fontSize: '18px',
              opacity: 0.9,
              marginBottom: '30px',
              lineHeight: '1.6'
            }}>
              Master in-demand skills with 500+ expert-led courses. 
              Interactive lessons, live sessions, and industry-recognized certificates.
            </p>
            
            <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '40px' }}>
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
                  Explore Courses →
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
                  Join Free Today
                </button>
              </Link>
            </div>
            
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
              <div><span style={{ fontSize: '28px', fontWeight: 'bold', color: '#fbbf24' }}>50K+</span><br />Students</div>
              <div><span style={{ fontSize: '28px', fontWeight: 'bold', color: '#fbbf24' }}>500+</span><br />Courses</div>
              <div><span style={{ fontSize: '28px', fontWeight: 'bold', color: '#fbbf24' }}>120+</span><br />Instructors</div>
              <div><span style={{ fontSize: '28px', fontWeight: 'bold', color: '#fbbf24' }}>4.9★</span><br />Rating</div>
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
              }}>RS</div>
              <div>
                <h4 style={{ margin: 0 }}>My Learning Path</h4>
                <p style={{ margin: 0, fontSize: '12px', opacity: 0.7 }}>Full Stack Developer Track</p>
              </div>
            </div>
            
            <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '10px', height: '8px', marginBottom: '10px' }}>
              <div style={{ width: '68%', height: '100%', background: 'linear-gradient(90deg, #f59e0b, #10b981)', borderRadius: '10px' }}></div>
            </div>
            <p style={{ fontSize: '14px', marginBottom: '20px' }}>68% Complete — Keep going! 🚀</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.08)', padding: '10px', borderRadius: '10px' }}>
                <span style={{ fontSize: '20px' }}>✅</span>
                <div><strong>HTML & CSS Foundations</strong><br /><span style={{ fontSize: '12px' }}>Completed</span></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.08)', padding: '10px', borderRadius: '10px' }}>
                <span style={{ fontSize: '20px' }}>▶️</span>
                <div><strong>JavaScript Essentials</strong><br /><span style={{ fontSize: '12px' }}>In Progress</span></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.08)', padding: '10px', borderRadius: '10px' }}>
                <span style={{ fontSize: '20px' }}>🔒</span>
                <div><strong>React.js Advanced</strong><br /><span style={{ fontSize: '12px' }}>Locked</span></div>
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
                <img src={course.image} alt={course.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '20px' }}>
                  {course.badge && (
                    <span style={{ background: '#fef3c7', color: '#d97706', padding: '3px 10px', borderRadius: '50px', fontSize: '11px', fontWeight: 'bold' }}>{course.badge}</span>
                  )}
                  <h3 style={{ marginTop: '10px', marginBottom: '8px', fontSize: '18px' }}>{course.title}</h3>
                  <p style={{ color: '#666', fontSize: '14px', marginBottom: '10px' }}>{course.instructor}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                    <span style={{ color: '#f59e0b' }}>⭐ {course.rating} ({course.students.toLocaleString()} students)</span>
                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#4f46e5' }}>₹{course.price}</span>
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
            <span style={{ background: '#e0e7ff', color: '#4f46e5', padding: '5px 15px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' }}>💬 Reviews</span>
            <h2 style={{ fontSize: '32px', marginTop: '15px' }}>What Our <span style={{ color: '#4f46e5' }}>Students Say</span></h2>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {testimonials.map((t, i) => (
              <div key={i} style={{
                background: 'white',
                borderRadius: '20px',
                padding: '30px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
              }}>
                <div style={{ fontSize: '40px', color: '#c7d2fe', marginBottom: '15px' }}>"</div>
                <p style={{ color: '#475569', lineHeight: '1.6', marginBottom: '20px' }}>{t.text}</p>
                <div style={{ color: '#f59e0b', marginBottom: '15px' }}>{'★'.repeat(t.rating)}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '45px',
                    height: '45px',
                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold'
                  }}>{t.initial}</div>
                  <div>
                    <h5 style={{ margin: 0 }}>{t.author}</h5>
                    <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== INSTRUCTORS SECTION ========== */}
      <div style={{ padding: '80px 5%', background: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ background: '#e0e7ff', color: '#4f46e5', padding: '5px 15px', borderRadius: '50px', fontSize: '12px', fontWeight: 'bold' }}>👨‍🏫 Expert Instructors</span>
            <h2 style={{ fontSize: '32px', marginTop: '15px' }}>Learn from the <span style={{ color: '#4f46e5' }}>Best</span></h2>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px'
          }}>
            {[
              { name: 'Rahul Pathak', title: 'Full Stack Expert', students: '14K+', rating: '4.9', initial: 'RP' },
              { name: 'Dr. Meera Nair', title: 'Mathematics Professor', students: '9K+', rating: '4.8', initial: 'MN' },
              { name: 'Vikram Anand', title: 'Python Specialist', students: '7K+', rating: '4.7', initial: 'VA' },
              { name: 'Ananya Singh', title: 'ML & AI Expert', students: '5K+', rating: '4.9', initial: 'AS' }
            ].map((inst, i) => (
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
                }}>{inst.initial}</div>
                <h3 style={{ marginBottom: '5px' }}>{inst.name}</h3>
                <p style={{ color: '#4f46e5', marginBottom: '15px' }}>{inst.title}</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '12px', color: '#666' }}>
                  <div><strong>{inst.students}</strong><br />Students</div>
                  <div><strong>{inst.rating}★</strong><br />Rating</div>
                </div>
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
          <span style={{ background: 'rgba(255,255,255,0.15)', padding: '5px 15px', borderRadius: '50px', fontSize: '12px', display: 'inline-block', marginBottom: '20px' }}>🚀 Start Your Journey</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: '15px' }}>Ready to <span style={{ color: '#fbbf24' }}>Transform</span> Your Career?</h2>
          <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '30px' }}>Join 50,000+ students already learning on EduNova.</p>
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
            }}>Enroll Now — It's Free 🎯</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;