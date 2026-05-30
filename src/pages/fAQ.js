import React, { useState } from 'react';
import { faqs } from '../data/mockData';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container" style={{ padding: '60px 0', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', textAlign: 'center' }}>Frequently Asked Questions</h1>
      <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '48px' }}>Find answers to common questions about EduNova</p>
      
      {faqs.map((faq, index) => (
        <div key={index} style={{ 
          border: '1px solid #e2e8f0', 
          borderRadius: '12px', 
          marginBottom: '12px',
          overflow: 'hidden',
          background: 'white'
        }}>
          <div 
            onClick={() => toggleFAQ(index)}
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '18px 22px',
              cursor: 'pointer',
              fontWeight: 600,
              background: openIndex === index ? '#f1f5ff' : 'white',
              transition: 'all 0.3s'
            }}
          >
            <span style={{ fontSize: '0.95rem' }}>{faq.q}</span>
            <span style={{ fontSize: '1.2rem', color: '#4f46e5' }}>{openIndex === index ? '−' : '+'}</span>
          </div>
          {openIndex === index && (
            <div style={{ 
              padding: '18px 22px', 
              borderTop: '1px solid #e2e8f0',
              fontSize: '0.85rem',
              color: '#4b5563',
              lineHeight: '1.7',
              background: 'white'
            }}>
              {faq.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ;