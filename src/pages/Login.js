import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await login(email, password);
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      const isAdmin = email === 'admin@edunova.com' || email === 'admin@gyanmantra.com';
      navigate(isAdmin ? '/admin/upload' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f9fafb' }}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', minHeight: '100vh' }}>
        <div style={{ flex: '1 1 400px', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', padding: 'clamp(30px, 5vw, 60px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)', pointerEvents: 'none' }}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 40, textDecoration: 'none' }}>
              <div style={{ color: 'white', fontSize: 24, fontWeight: 700 }}>Gyan Maantra</div>
            </Link>
            <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 800, marginBottom: 16, color: '#fff' }}>Welcome back! ??</h2>
            <p style={{ fontSize: 'clamp(0.85rem, 3vw, 1rem)', opacity: 0.9, marginBottom: 48, color: '#fff', lineHeight: 1.5 }}>Log in to continue your learning journey and access secure course videos.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {['?? 500+ Expert Courses', '?? Secure video streaming', '?? Student progress dashboard', '?? Personal learning plan'].map((feature, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 48, height: 48, borderRadius: 16, background: 'rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', backdropFilter: 'blur(10px)' }}>{feature.split(' ')[0]}</div>
                  <div>
                    <h5 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', margin: 0 }}>{feature}</h5>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(20px, 5vw, 40px)', background: '#fff' }}>
          <div style={{ width: '100%', maxWidth: 480 }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h3 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', fontWeight: 700, marginBottom: 8, color: '#1f2937' }}>Sign in to Gyan Maantra</h3>
              <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Don�t have an account? <Link to="/signup" style={{ color: '#4f46e5', fontWeight: 600, textDecoration: 'none' }}>Create one free ?</Link></p>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
              <label style={{ display: 'grid', gap: 8, color: '#374151', fontWeight: 600 }}>Email address
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: 14, borderRadius: 14, border: '1px solid #d1d5db', fontSize: 16 }} />
              </label>
              <label style={{ display: 'grid', gap: 8, color: '#374151', fontWeight: 600 }}>Password
                <div style={{ position: 'relative' }}>
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%', padding: 14, borderRadius: 14, border: '1px solid #d1d5db', fontSize: 16 }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#4f46e5', cursor: 'pointer', fontWeight: 600 }}>{showPassword ? 'Hide' : 'Show'}</button>
                </div>
              </label>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#6b7280', fontSize: 14 }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} /> Remember me</label>
              </div>
              {error && <div style={{ color: '#b91c1c', fontWeight: 600 }}>{error}</div>}
              <button type="submit" disabled={loading} style={{ width: '100%', background: '#4f46e5', color: '#fff', border: 'none', padding: '14px 18px', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>{loading ? 'Signing in...' : 'Sign In'}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
