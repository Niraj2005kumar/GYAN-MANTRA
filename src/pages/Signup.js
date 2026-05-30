import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const checkPasswordStrength = (password) => {
    if (!password) {
      setPasswordStrength('');
      return;
    }
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    if (strength <= 2) setPasswordStrength('Weak');
    else if (strength === 3) setPasswordStrength('Medium');
    else setPasswordStrength('Strong');
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (name === 'password') {
      checkPasswordStrength(value);
    }
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      setError('Please enter your first name');
      return false;
    }
    if (!formData.lastName.trim()) {
      setError('Please enter your last name');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Please enter your email address');
      return false;
    }
    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Please create a password');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.terms) {
      setError('Please accept the Terms of Service');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError('');

    try {
      const fullName = `${formData.firstName} ${formData.lastName}`;
      await signup(fullName, formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 'Weak') return '#ef4444';
    if (passwordStrength === 'Medium') return '#f59e0b';
    if (passwordStrength === 'Strong') return '#10b981';
    return '#e5e7eb';
  };

  const features = [
    'Access to 500+ expert-led courses',
    'Secure private video delivery',
    'Track your progress',
    'Student dashboard',
    'Admin upload controls'
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#f9fafb' }}>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', minHeight: '100vh' }}>
        <div style={{ flex: '1 1 400px', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', padding: 'clamp(30px, 5vw, 60px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)', pointerEvents: 'none' }}></div>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 40, textDecoration: 'none' }}>
              <div style={{ color: 'white', fontSize: 24, fontWeight: 700 }}>Gyan Mantra</div>
            </Link>
            <h2 style={{ fontSize: 'clamp(1.5rem, 5vw, 2.5rem)', fontWeight: 800, marginBottom: 16, color: '#fff' }}>Start learning today! ??</h2>
            <p style={{ fontSize: 'clamp(0.85rem, 3vw, 1rem)', opacity: 0.9, marginBottom: 36, color: '#fff', lineHeight: 1.5 }}>Create an account to get secure access to video lessons, protected by JWT and Cloudinary authenticated streaming.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {features.map((feature, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 12, background: 'rgba(255, 255, 255, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>{index + 1}</div>
                  <div style={{ color: '#fff' }}>{feature}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ flex: '1 1 400px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'clamp(20px, 5vw, 40px)', background: '#fff' }}>
          <div style={{ width: '100%', maxWidth: 520 }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <h3 style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)', fontWeight: 700, marginBottom: 8, color: '#1f2937' }}>Create your account</h3>
              <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>Already registered? <Link to="/login" style={{ color: '#4f46e5', fontWeight: 600, textDecoration: 'none' }}>Sign in instead</Link></p>
            </div>
            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
              <div style={{ display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr' }}>
                <label style={{ display: 'grid', gap: 8, color: '#374151', fontWeight: 600 }}>First name
                  <input name="firstName" value={formData.firstName} onChange={handleChange} style={{ width: '100%', padding: 14, borderRadius: 14, border: '1px solid #d1d5db', fontSize: 16 }} />
                </label>
                <label style={{ display: 'grid', gap: 8, color: '#374151', fontWeight: 600 }}>Last name
                  <input name="lastName" value={formData.lastName} onChange={handleChange} style={{ width: '100%', padding: 14, borderRadius: 14, border: '1px solid #d1d5db', fontSize: 16 }} />
                </label>
              </div>
              <label style={{ display: 'grid', gap: 8, color: '#374151', fontWeight: 600 }}>Email address
                <input name="email" value={formData.email} onChange={handleChange} type="email" style={{ width: '100%', padding: 14, borderRadius: 14, border: '1px solid #d1d5db', fontSize: 16 }} />
              </label>
              <label style={{ display: 'grid', gap: 8, color: '#374151', fontWeight: 600 }}>Password
                <div style={{ position: 'relative' }}>
                  <input name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleChange} style={{ width: '100%', padding: 14, borderRadius: 14, border: '1px solid #d1d5db', fontSize: 16 }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#4f46e5', cursor: 'pointer', fontWeight: 600 }}>{showPassword ? 'Hide' : 'Show'}</button>
                </div>
              </label>
              <label style={{ display: 'grid', gap: 8, color: '#374151', fontWeight: 600 }}>Confirm password
                <div style={{ position: 'relative' }}>
                  <input name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} value={formData.confirmPassword} onChange={handleChange} style={{ width: '100%', padding: 14, borderRadius: 14, border: '1px solid #d1d5db', fontSize: 16 }} />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'transparent', border: 'none', color: '#4f46e5', cursor: 'pointer', fontWeight: 600 }}>{showConfirmPassword ? 'Hide' : 'Show'}</button>
                </div>
              </label>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#374151' }}><input name="terms" type="checkbox" checked={formData.terms} onChange={handleChange} /> I agree to the Terms</label>
                <span style={{ color: getPasswordStrengthColor(), fontWeight: 700 }}>{passwordStrength}</span>
              </div>
              {error && <div style={{ color: '#b91c1c', fontWeight: 600 }}>{error}</div>}
              <button type="submit" disabled={loading} style={{ width: '100%', background: '#4f46e5', color: '#fff', border: 'none', padding: '14px 18px', borderRadius: 14, fontSize: 16, fontWeight: 700, cursor: 'pointer' }}>{loading ? 'Creating account...' : 'Create account'}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
