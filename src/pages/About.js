import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { number: '50K+', label: 'Happy Students' },
    { number: '500+', label: 'Expert Courses' },
    { number: '120+', label: 'Expert Instructors' },
    { number: '4.9★', label: 'Average Rating' }
  ];

  const teamMembers = [
    { name: 'Dr. Rajesh Kumar', role: 'Founder & CEO', image: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { name: 'Prof. Priya Sharma', role: 'Head of Academics', image: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { name: 'Amit Verma', role: 'Lead Instructor', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { name: 'Neha Gupta', role: 'Curriculum Designer', image: 'https://randomuser.me/api/portraits/women/28.jpg' }
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
            About Gyan Mantra
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
              Gyan Mantra was founded in 2020 with a simple yet powerful vision — to make 
              quality education accessible to everyone, regardless of their location or background.
            </p>
            <p style={{ 
              fontSize: '1rem', 
              lineHeight: '1.7', 
              marginBottom: '20px',
              color: '#4b5563'
            }}>
              What started as a small initiative with just 5 courses has now grown into 
              India's #1 EdTech platform, serving over 50,000+ students across the country.
            </p>
            <p style={{ 
              fontSize: '1rem', 
              lineHeight: '1.7', 
              marginBottom: '20px',
              color: '#4b5563'
            }}>
              Our team of 120+ expert instructors works tirelessly to create industry-relevant 
              content that helps students build real-world skills and advance their careers.
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
              To democratize education by providing affordable, high-quality learning experiences 
              that transform lives and build future-ready professionals.
            </p>

            <h3 style={{ 
              margin: '32px 0 16px', 
              color: '#1f2937',
              fontSize: '1.35rem'
            }}>
              💡 Our Vision
            </h3>
            <p style={{ 
              fontSize: '1rem', 
              lineHeight: '1.7', 
              color: '#4b5563'
            }}>
              To become the most trusted and innovative learning platform that empowers 1 million+ 
              learners to achieve their dreams by 2030.
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
            What Makes Us Different?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px'
          }}>
            {[
              { emoji: '🎓', title: 'Expert Instructors', desc: 'Learn from industry professionals with years of real-world experience' },
              { emoji: '📱', title: 'Learn Anywhere', desc: 'Access courses on mobile, tablet, or desktop - anytime, anywhere' },
              { emoji: '🏆', title: 'Certification', desc: 'Earn industry-recognized certificates upon course completion' },
              { emoji: '💬', title: '24/7 Support', desc: 'Get your doubts cleared anytime with our dedicated support team' }
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
            Passionate educators dedicated to your success
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
            Ready to Start Your Learning Journey?
          </h2>
          <p style={{ marginBottom: '32px', opacity: 0.95, fontSize: '1.1rem' }}>
            Join 50,000+ students already learning on Gyan Mantra
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
                Explore Courses →
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
                Join Free Today
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;