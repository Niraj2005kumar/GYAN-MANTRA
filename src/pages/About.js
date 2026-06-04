import React from 'react';
import { Link } from 'react-router-dom';

import rishavImg from './image/rishav.jpg';
import tusharImg from './image/Tushar.jpeg';
import nirajImg from './image/niraj.png';

const About = () => {
  const stats = [
    { number: '50K+', label: 'Happy Students' },
    { number: '500+', label: 'Expert Courses' },
    { number: '120+', label: 'Expert Instructors' },
    { number: '4.9★', label: 'Average Rating' }
  ];

  const teamMembers = [
     {
    name: 'Rishabh Anand',
    role: 'Founder & JEE | NDA Mentor',
    image: rishavImg
  },
  {
    name: 'Tushar Chaurasia',
    role: 'Academic Mentor | Class 8th–12th Faculty',
    image: tusharImg
  },
  {
    name: 'Niraj Verma',
    role: 'Niraj Verma | Technical Lead & Web Developer',
    image: nirajImg
  }
    
  ];

  return (
    <>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        color: 'white',
        padding: '80px 5%',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            marginBottom: '20px',
            fontWeight: '700'
          }}>
            About Gyan Maantra
          </h1>
          <p style={{ 
            fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
            opacity: 0.95,
            lineHeight: '1.6'
          }}>
            Empowering learners worldwide with quality education in programming, mathematics, and technology
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '60px 5%' 
      }}>
        
        {/* Our Story Section */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '48px',
          marginBottom: '80px'
        }}>
          <div>
            <h2 style={{ 
              fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
              marginBottom: '24px',
              color: '#1f2937'
            }}>
              Our Story
            </h2>
            <p style={{ 
              fontSize: '1rem', 
              lineHeight: '1.7', 
              marginBottom: '20px',
              color: '#4b5563'
            }}>
              Gyan Maantra was founded with a clear vision — to provide quality education built on strong concepts, discipline, 
              and consistent academic growth. From the beginning, the focus has been on personalized learning and individual attention. 
              With small batch sizes and structured guidance, students receive the support they need to build a solid academic foundation. 
              Over the years, Gyan Maantra has developed into a trusted learning platform where students are guided not only to complete their
             syllabus but to truly understand and master it.
            </p>
            <p style={{ 
              fontSize: '1rem', 
              lineHeight: '1.7', 
              marginBottom: '20px',
              color: '#4b5563'
            }}>
              Starting with just a handful of students, Gyan Maantra has grown to serve thousands of learners across India.
            </p>
            <p style={{ 
              fontSize: '1rem', 
              lineHeight: '1.7', 
              marginBottom: '20px',
              color: '#4b5563'
            }}>
              Our commitment to quality education, expert instructors, and student success has been the driving force behind our growth and impact.
            </p>
            
            <h3 style={{ 
              margin: '32px 0 16px', 
              color: '#1f2937',
              fontSize: '1.35rem'
            }}>
              🎯 Our Mission
            </h3>
            <p style={{ 
              fontSize: '1rem', 
              lineHeight: '1.7', 
              color: '#4b5563'
            }}>
             At Gyan Maantra, our mission is to help students unlock their true potential through quality education and expert mentorship.
            <br /><br />
              • Strong fundamentals and conceptual clarity.
              <br />
              • Personalized guidance from experienced educators.
              <br />
              • Regular practice, mock tests, and performance analysis.
              <br />
              • Effective preparation for Class 8th–12th, JEE Main, JEE Advanced, and NDA.
              <br /><br />
              We believe that every student has the ability to succeed.
              With the right support, discipline, and dedication, students can achieve academic excellence and confidently move toward their dreams.
            </p>

            <h3 style={{ 
              margin: '32px 0 16px', 
              color: '#1f2937',
              fontSize: '1.35rem'
            }}>
              💡 Our Vision
            </h3>
            <p style={{ 
               
              
              color: '#4b5563'
            }}>
              Our vision is to become one of the most trusted and result-driven educational institutes, inspiring students to achieve academic excellence and build a brighter future.
              <br /><br />
              We aim to create a learning environment where:
              <br /><br />
              • Students feel motivated, confident, and eager to learn.
              <br />
              • Progress is regularly monitored through practice and assessments.
              <br />
              • Parents stay informed with transparent academic updates.
              <br />
              • Education nurtures knowledge, discipline, character, and long-term success.
              <br /><br />
              At Gyan Maantra, we believe that quality guidance and consistent effort can help every student reach their highest potential.
            </p>
          </div>
          
          <div>
            <img 
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=600" 
              alt="Students learning together" 
              style={{ 
                width: '100%', 
                borderRadius: '24px',
                boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)',
                marginBottom: '24px'
              }}
              onError={(e) => {
                e.target.src = 'https://picsum.photos/id/24/600/400';
              }}
            />
            <div style={{
              background: '#f3f4f6',
              padding: '24px',
              borderRadius: '16px',
              textAlign: 'center'
            }}>
              <p style={{ fontStyle: 'italic', color: '#4b5563', marginBottom: '12px' }}>
                "Education is the most powerful weapon which you can use to change the world."
              </p>
              <p style={{ fontWeight: '600', color: '#1f2937' }}>— Nelson Mandela</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          marginBottom: '80px',
          padding: '40px 20px',
          background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
          borderRadius: '32px'
        }}>
          {stats.map((stat, index) => (
            <div key={index} style={{ textAlign: 'center' }}>
              <div style={{ 
                fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', 
                fontWeight: '700', 
                color: '#4f46e5',
                marginBottom: '8px'
              }}>
                {stat.number}
              </div>
              <div style={{ color: '#4b5563', fontSize: '0.95rem' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* What Makes Us Different */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
            marginBottom: '48px',
            color: '#1f2937'
          }}>
            Why Choose Gyan Maantra?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px'
          }}>
            {[
              { emoji: '🎓', title: 'Expert Faculty', desc: 'Learn from experienced educators dedicated to Class 8th–12th, JEE Main, JEE Advanced & NDA' },
              { emoji: '📱', title: 'Structured Learning', desc: 'Well-planned classes, notes, and regular practice to ensure steady academic growth.' },
              { emoji: '🏆', title: 'Mock Tests & Analysis', desc: 'Regular tests and performance tracking to improve exam readiness.' },
              { emoji: '💬', title: 'Doubt Solving Support', desc: 'Quick and effective guidance to help students overcome learning challenges.' }
            ].map((item, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '28px',
                borderRadius: '20px',
                textAlign: 'center',
                boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{item.emoji}</div>
                <h3 style={{ marginBottom: '12px', color: '#1f2937' }}>{item.title}</h3>
                <p style={{ color: '#6b7280', lineHeight: '1.5', fontSize: '0.9rem' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Meet Our Team */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: 'clamp(1.5rem, 4vw, 2rem)', 
            marginBottom: '16px',
            color: '#1f2937'
          }}>
            Meet Our Leadership Team
          </h2>
          <p style={{ textAlign: 'center', color: '#6b7280', marginBottom: '48px' }}>
            Experienced mentors committed to helping
            students achieve academic excellence.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '32px'
          }}>
            {teamMembers.map((member, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <img 
                  src={member.image} 
                  alt={member.name}
                  style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginBottom: '16px',
                    border: '3px solid #4f46e5'
                  }}
                />
                <h3 style={{ color: '#1f2937', marginBottom: '4px' }}>{member.name}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.85rem' }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
          borderRadius: '32px',
          padding: '60px 40px',
          textAlign: 'center',
          color: 'white'
        }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2rem)', marginBottom: '16px' }}>
            Start Your Journey Towards Success
          </h2>
          <p style={{ marginBottom: '32px', opacity: 0.95, fontSize: '1.1rem' }}>
            Join students preparing for
            Class 8th–12th, JEE Main, JEE Advanced & NDA.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/courses">
              <button style={{
                background: 'white',
                color: '#4f46e5',
                border: 'none',
                padding: '12px 32px',
                borderRadius: '40px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'transform 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
              >
                View Courses →
              </button>
            </Link>
            <Link to="/signup">
              <button style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '12px 32px',
                borderRadius: '40px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}>
                Join Free Demo
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;