import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', or null

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear status when user starts typing again
    if (submitStatus) setSubmitStatus(null);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Validation
  if (!formData.name.trim()) {
    setSubmitStatus("error");
    alert("Please enter your name");
    return;
  }

  if (!formData.email.trim() || !formData.email.includes("@")) {
    setSubmitStatus("error");
    alert("Please enter a valid email address");
    return;
  }

  if (!formData.message.trim()) {
    setSubmitStatus("error");
    alert("Please enter your message");
    return;
  }

  setIsSubmitting(true);

  try {
    const response = await fetch(
      "https://formsubmit.co/ajax/nirajverma075@gmail.com",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: new FormData(e.target),
      }
    );

    if (response.ok) {
      setSubmitStatus("success");

      alert("✅ Message sent successfully!");

      setFormData({
        name: "",
        email: "",
        message: "",
      });

      setTimeout(() => {
        setSubmitStatus(null);
      }, 3000);

    } else {
      setSubmitStatus("error");
      alert("❌ Failed to send message.");
    }

  } catch (error) {
    console.log(error);
    setSubmitStatus("error");
    alert("❌ Something went wrong.");
  }

  setIsSubmitting(false);
  };

  const contactInfo = [
    { icon: '📧', title: 'Email Us', details: ['gyanmaantra2@gmail.com'], link: 'mailto:gyanmaantra2@gmail.com' },
    { icon: '📞', title: 'Call Us', details: ['+91 8882753535', '+91 8383008436'], link: 'tel:+918882753535' },
    { icon: '📍', title: 'Visit Us', details: ['Aya nage New delhi, India'], link: 'https://maps.google.com/?q=Bengaluru+India' },
    { icon: '⏰', title: 'Business Hours', details: ['Mon-Fri: 9AM - 7PM', 'Sat: 10AM - 4PM'] }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: 'fab fa-facebook-f', url: 'https://facebook.com', color: '#1877f2' },
    { name: 'Twitter', icon: 'fab fa-twitter', url: 'https://twitter.com', color: '#1da1f2' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/company/gyan-maantra/', color: '#0077b5' },
    { name: 'Instagram', icon: 'fab fa-instagram', url: '', color: '#e4405f' },
    { name: 'YouTube', icon: 'fab fa-youtube', url: 'https://www.youtube.com/@GyanMaantra', color: '#ff0000' }
  ];

  return (
    <>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
        color: 'white',
        padding: '60px 5%',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3rem)', 
            marginBottom: '16px',
            fontWeight: '700'
          }}>
            Contact Us
          </h1>
          <p style={{ 
            fontSize: 'clamp(1rem, 3vw, 1.2rem)', 
            opacity: 0.95,
            lineHeight: '1.6'
          }}>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '60px 5%' 
      }}>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
          gap: '48px'
        }}>
          
          {/* Left Side - Contact Info */}
          <div>
            {/* Contact Information Cards */}
            <div style={{
              display: 'grid',
              gap: '20px',
              marginBottom: '40px'
            }}>
              {contactInfo.map((info, index) => (
                <a 
                  key={index}
                  href={info.link || '#'}
                  target={info.link ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px',
                    padding: '24px',
                    background: 'white',
                    borderRadius: '20px',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 20px 25px -12px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0,0,0,0.1)';
                  }}
                  >
                    <div style={{
                      fontSize: '2rem',
                      minWidth: '50px'
                    }}>
                      {info.icon}
                    </div>
                    <div>
                      <h3 style={{ 
                        marginBottom: '8px', 
                        color: '#1f2937',
                        fontSize: '1.2rem'
                      }}>
                        {info.title}
                      </h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} style={{ 
                          color: '#6b7280', 
                          marginBottom: idx === info.details.length - 1 ? 0 : '4px',
                          lineHeight: '1.5'
                        }}>
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Map Section */}
            <div style={{
              background: '#f3f4f6',
              borderRadius: '20px',
              padding: '20px',
              marginBottom: '24px'
            }}>
              <h3 style={{ marginBottom: '16px', color: '#1f2937' }}>Find Us</h3>
              <iframe 
                title="Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d248849.56649618304!2d77.46630625824113!3d12.954295380632766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                style={{ width: '100%', height: '250px', border: 0, borderRadius: '12px' }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

            {/* Social Links */}
            <div style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
            }}>
              <h3 style={{ marginBottom: '20px', color: '#1f2937' }}>Connect With Us</h3>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none' }}
                  >
                    <div style={{
                      width: '48px',
                      height: '48px',
                      background: social.color,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'transform 0.2s ease',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      <i className={social.icon} style={{ color: 'white', fontSize: '20px' }}></i>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: 'clamp(24px, 5vw, 40px)',
            boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)'
          }}>
            <h2 style={{ 
              fontSize: 'clamp(1.5rem, 4vw, 1.8rem)', 
              marginBottom: '8px',
              color: '#1f2937'
            }}>
              Send Us a Message
            </h2>
            <p style={{ 
              color: '#6b7280', 
              marginBottom: '32px',
              fontSize: '0.95rem'
            }}>
              Fill out the form below and we'll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit}>
              <input
                type="hidden"
                name="_subject"
                value="📚 New Student Enquiry - Gyan Mantra"
              />

                <input
                type="hidden"
                name="_captcha"
                value="false"
                />
              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    fontSize: '1rem',
                    borderRadius: '12px',
                    border: `2px solid ${submitStatus === 'error' && !formData.name ? '#ef4444' : '#e5e7eb'}`,
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.style.borderColor = '#e5e7eb';
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    fontSize: '1rem',
                    borderRadius: '12px',
                    border: `2px solid ${submitStatus === 'error' && !formData.email.includes('@') ? '#ef4444' : '#e5e7eb'}`,
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.style.borderColor = '#e5e7eb';
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    fontSize: '1rem',
                    borderRadius: '12px',
                    border: `2px solid ${submitStatus === 'error' && !formData.message ? '#ef4444' : '#e5e7eb'}`,
                    outline: 'none',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.style.borderColor = '#e5e7eb';
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '14px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: 'white',
                  background: isSubmitting ? '#9ca3af' : 'linear-gradient(135deg, #4f46e5, #7c3aed)',
                  border: 'none',
                  borderRadius: '40px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'transform 0.2s, opacity 0.2s',
                  opacity: isSubmitting ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.target.style.transform = 'scale(1.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              >
                {isSubmitting ? 'Sending...' : 'Send Message →'}
              </button>

              {submitStatus === 'success' && (
                <div style={{
                  marginTop: '16px',
                  padding: '12px',
                  background: '#10b981',
                  color: 'white',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontSize: '0.9rem'
                }}>
                  ✅ Message sent successfully!
                </div>
              )}
            </form>

            {/* FAQ Note */}
            <div style={{
              marginTop: '32px',
              padding: '16px',
              background: '#fef3c7',
              borderRadius: '12px',
              textAlign: 'center'
            }}>
              <p style={{ color: '#92400e', fontSize: '0.85rem' }}>
                💡 For quick answers, check out our <a href="/faq" style={{ color: '#4f46e5', fontWeight: '600' }}>FAQ page</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Font Awesome CDN - Add to your index.html or head */}
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </>
  );
};

export default Contact;