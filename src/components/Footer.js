import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: '#0f172a',
      color: '#ffffff',
      padding: '60px 5% 30px',
      marginTop: '10px'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto'
      }}>
        {/* Main Footer Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
          marginBottom: '48px'
        }}>
          
          {/* Column 1 - Brand & Social */}
          <div>
            {/* Logo */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '16px'
            }}>
              <img 
                src="/logo.jpeg" 
                alt="Gyan Maantra Logo" 
                style={{
                  width: '140px',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  background: 'white',
                  padding: '5px 10px'
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div style={{
                display: 'none',
                width: '45px',
                height: '45px',
                background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                borderRadius: '10px',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                fontSize: '18px'
              }}>GM</div>
            </div>
            
            <p style={{
              fontSize: '14px',
              opacity: 0.7,
              lineHeight: '1.6',
              maxWidth: '280px',
              marginBottom: '24px'
            }}>
              Gyan Maantra is a trusted learning platform
              for Class 8th–12th students and aspirants
              preparing for JEE Main, JEE Advanced & NDA.
            </p>
            
            {/* Social Links */}
            <div style={{ display: 'flex', gap: '12px' }}>
              {[
                { name: 'in', icon: '🔗', url: '#' },
                { name: 'tw', icon: '🐦', url: '#' },
                { name: 'fb', icon: '📘', url: '#' },
                { name: 'yt', icon: '▶️', url: '#' },
                { name: 'ig', icon: '📷', url: '#' }
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    cursor: 'pointer',
                    transition: 'all 0.3s',
                    textDecoration: 'none',
                    color: 'white'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 - Courses */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '20px',
              color: '#ffffff'
            }}>📚 Courses</h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {['Class 8th', 'Class 9th', 'Class 10th', 'Class 11th', 'Class 12th', 'JEE Main', 'JEE Advanced', 'NDA Preparation'].map(course => (
                <li key={course}>
                  <Link 
                    to="/courses" 
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    {course}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Company */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '20px',
              color: '#ffffff'
            }}>🏢 Company</h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Blog', path: '/blog' },
                { name: 'Contact', path: '/contact' },
                { name: 'FAQ', path: '/faq' },
                { name: 'Privacy Policy', path: '/privacy' },
                { name: 'Terms of Service', path: '/terms' }
              ].map(item => (
                <li key={item.name}>
                  <Link 
                    to={item.path} 
                    style={{
                      color: 'rgba(255,255,255,0.6)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s'
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'white'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Contact Info */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '20px',
              color: '#ffffff'
            }}>📞 Contact Us</h4>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '18px' }}>📍</span>
                <span style={{ fontSize: '14px', opacity: 0.7 }}>Aya Nagar new Delhi, India</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '18px' }}>📧</span>
                <a href="mailto:gyanmaantra2@gmail.com" style={{
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  fontSize: '14px'
                }}>
                  gyanmaantra2@gmail.com
                </a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '18px' }}>📞</span>
                <div>
                  <a href="tel:+918882753535" style={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    display: 'block'
                  }}>
                    +91 8882753535
                  </a>
                  <a href="tel:+918383008436" style={{
                    color: 'rgba(255,255,255,0.7)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    display: 'block',
                    marginTop: '5px'
                  }}>
                    +91 83830 08436
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <p style={{
            fontSize: '12px',
            opacity: 0.5,
            margin: 0
          }}>
            © {currentYear} Gyan Maantra. All rights reserved.
          </p>
          
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <a href="#" style={{
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              fontSize: '12px'
            }}>
              Privacy Policy
            </a>
            <a href="#" style={{
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              fontSize: '12px'
            }}>
              Terms of Service
            </a>
            <a href="#" style={{
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
              fontSize: '12px'
            }}>
              Refund Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;