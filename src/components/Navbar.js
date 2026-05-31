import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav style={{ 
        position: 'sticky', 
        top: 0, 
        zIndex: 999, 
        background: 'rgba(255,255,255,0.95)', 
        backdropFilter: 'blur(12px)', 
        borderBottom: '1px solid #e2e8f0', 
        padding: '0 5%' 
      }}>
        <div style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          height: '68px' 
        }}>
          
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img 
              src="/logo.jpeg" 
              alt="Gyan Mantra Logo" 
              style={{ 
                width: '140px', 
                height: 'auto', 
                maxHeight: '48px', 
                objectFit: 'contain' 
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                if(e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{
              display: 'none',
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
              borderRadius: '10px',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '18px'
            }}>GM</div>
          </Link>

          {/* Desktop Navigation Links - with className for media query */}
          <div className="nav-links-desktop" style={{ 
            display: 'flex', 
            gap: '4px'
          }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#4b5563', padding: '8px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: '500' }}>Home</Link>
            <Link to="/courses" style={{ textDecoration: 'none', color: '#4b5563', padding: '8px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: '500' }}>Courses</Link>
            <Link to="/about" style={{ textDecoration: 'none', color: '#4b5563', padding: '8px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: '500' }}>About</Link>
            <Link to="/contact" style={{ textDecoration: 'none', color: '#4b5563', padding: '8px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: '500' }}>Contact</Link>
            <Link to="/blog" style={{ textDecoration: 'none', color: '#4b5563', padding: '8px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: '500' }}>Blog</Link>
            <Link to="/faq" style={{ textDecoration: 'none', color: '#4b5563', padding: '8px 14px', borderRadius: '8px', fontSize: '14px', fontWeight: '500' }}>FAQ</Link>
          </div>
          
          {/* Desktop Auth Buttons */}
          <div className="auth-buttons-desktop" style={{ 
            display: 'flex', 
            gap: '12px',
            alignItems: 'center'
          }}>
            {user ? (
              <>
                <span style={{ color: '#4f46e5', fontWeight: '500', fontSize: '14px' }}>👋 {user.name}</span>
                {user.role === 'admin' && (
                  <Link to="/admin/dashboard">
                    <button style={{ 
                      background: 'transparent', 
                      border: '1px solid #cbd5e1', 
                      padding: '6px 16px', 
                      borderRadius: '40px', 
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#4b5563'
                    }}>Admin</button>
                  </Link>
                )}
                <Link to="/dashboard">
                  <button style={{ 
                    background: 'transparent', 
                    border: '1px solid #cbd5e1', 
                    padding: '6px 16px', 
                    borderRadius: '40px', 
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500',
                    color: '#4b5563'
                  }}>Dashboard</button>
                </Link>
                <button 
                  onClick={handleLogout} 
                  style={{ 
                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', 
                    color: 'white', 
                    border: 'none', 
                    padding: '6px 20px', 
                    borderRadius: '40px', 
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '500'
                  }}
                >Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button style={{ 
                    background: 'transparent', 
                    border: '1px solid #cbd5e1', 
                    padding: '8px 24px', 
                    borderRadius: '40px', 
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#4b5563'
                  }}>Login</button>
                </Link>
                <Link to="/signup">
                  <button style={{ 
                    background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', 
                    color: 'white', 
                    border: 'none', 
                    padding: '8px 24px', 
                    borderRadius: '40px', 
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>Get Started</button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="mobile-menu-btn"
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu" style={{
          position: 'fixed',
          top: '68px',
          left: 0,
          right: 0,
          background: 'white',
          borderBottom: '1px solid #e2e8f0',
          padding: '16px 5%',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          zIndex: 998,
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
        }}>
          <Link to="/" onClick={closeMobileMenu} style={{ textDecoration: 'none', color: '#4b5563', padding: '12px 16px', borderRadius: '8px', fontSize: '16px' }}>🏠 Home</Link>
          <Link to="/courses" onClick={closeMobileMenu} style={{ textDecoration: 'none', color: '#4b5563', padding: '12px 16px', borderRadius: '8px', fontSize: '16px' }}>📚 Courses</Link>
          <Link to="/about" onClick={closeMobileMenu} style={{ textDecoration: 'none', color: '#4b5563', padding: '12px 16px', borderRadius: '8px', fontSize: '16px' }}>ℹ️ About</Link>
          <Link to="/contact" onClick={closeMobileMenu} style={{ textDecoration: 'none', color: '#4b5563', padding: '12px 16px', borderRadius: '8px', fontSize: '16px' }}>📞 Contact</Link>
          <Link to="/blog" onClick={closeMobileMenu} style={{ textDecoration: 'none', color: '#4b5563', padding: '12px 16px', borderRadius: '8px', fontSize: '16px' }}>📝 Blog</Link>
          <Link to="/faq" onClick={closeMobileMenu} style={{ textDecoration: 'none', color: '#4b5563', padding: '12px 16px', borderRadius: '8px', fontSize: '16px' }}>❓ FAQ</Link>
          <div style={{ borderTop: '1px solid #e2e8f0', margin: '8px 0' }}></div>
          {!user && (
            <>
              <Link to="/login" onClick={closeMobileMenu}>
                <button style={{ width: '100%', background: 'transparent', border: '1px solid #cbd5e1', padding: '12px', borderRadius: '40px', cursor: 'pointer' }}>Login</button>
              </Link>
              <Link to="/signup" onClick={closeMobileMenu}>
                <button style={{ width: '100%', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white', border: 'none', padding: '12px', borderRadius: '40px', cursor: 'pointer' }}>Get Started</button>
              </Link>
            </>
          )}
        </div>
      )}

      {/* Add responsive CSS via style tag - THIS IS THE FIX */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop {
            display: none !important;
          }
          .auth-buttons-desktop {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;