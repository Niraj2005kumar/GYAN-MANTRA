import React from 'react';
import { blogPosts } from '../data/mockData';

const Blog = () => {
  return (
    <div className="container" style={{ padding: '60px 0' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '16px', textAlign: 'center' }}>Study Materials & Tips</h1>
      <p style={{ textAlign: 'center', color: '#64748b', marginBottom: '48px' }}>Expert guidance and study strategies for academic success.</p>
      <div className="grid">
        {blogPosts.map((post, idx) => (
          <div key={idx} className="card" style={{ padding: '24px' }}>
            <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{post.emoji}</div>
            <div className="blog-cat" style={{ fontSize: '0.72rem', color: '#4f46e5', fontWeight: 600 }}>{post.cat}</div>
            <h3 style={{ margin: '12px 0 8px', fontSize: '1rem' }}>{post.title}</h3>
            <p style={{ color: '#64748b', fontSize: '0.82rem', marginBottom: '16px' }}>{post.excerpt}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8' }}>
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            <button className="btn-outline" style={{ marginTop: '16px', width: '100%' }}>Read More →</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;