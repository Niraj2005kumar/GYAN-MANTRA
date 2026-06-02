import React, { useEffect, useState } from 'react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminSidebar from '../../components/admin/AdminSidebar';

const initialFormState = {
  title: '',
  category: '',
  description: '',
  longDescription: '',
  price: '',
  oldPrice: '',
  status: 'Published',
  level: 'Beginner',
  instructor: '',
  instructorInitials: '',
  emoji: '📘',
  color: '#4f46e5',
  color2: '#ec4899',
  stock: 0,
  tags: '',
  thumbnailUrl: '',
  thumbnailFile: null
};

const AdminCourses = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const loadCourses = async () => {
    try {
      setLoading(true);
      const response = await api.get('/courses');
      setCourses(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const resetForm = () => {
    setForm(initialFormState);
    setSelectedCourse(null);
    setMessage('');
    setError('');
  };

  const handleInputChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const uploadThumbnail = async () => {
    if (!form.thumbnailFile) return form.thumbnailUrl;
    const uploadData = new FormData();
    uploadData.append('thumbnail', form.thumbnailFile);

    const response = await api.post('/admin/upload-thumbnail', uploadData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    return response.data.thumbnailUrl || response.data.url || '';
  };

  const handleSave = async () => {
    if (!form.title.trim() || !form.description.trim()) {
      setError('Title and description are required.');
      setMessage('');
      return;
    }

    setSaving(true);
    setError('');
    setMessage('');

    try {
      const thumbnailUrl = await uploadThumbnail();
      const payload = {
        title: form.title.trim(),
        category: form.category.trim() || 'General',
        description: form.description.trim(),
        longDescription: form.longDescription.trim(),
        price: Number(form.price) || 0,
        oldPrice: Number(form.oldPrice) || 0,
        status: form.status,
        level: form.level,
        instructor: form.instructor.trim(),
        instructorInitials: form.instructorInitials.trim(),
        emoji: form.emoji,
        color: form.color,
        color2: form.color2,
        stock: Number(form.stock) || 0,
        tags: form.tags.split(',').map((tag) => tag.trim()).filter(Boolean),
        thumbnailUrl
      };

      if (selectedCourse) {
        const response = await api.put(`/admin/courses/${selectedCourse._id || selectedCourse.id}`, payload);
        setCourses((prev) => prev.map((course) => (course._id === response.data._id || course.id === response.data.id ? response.data : course)));
        setMessage('Course updated successfully.');
      } else {
        const response = await api.post('/admin/courses', payload);
        setCourses((prev) => [response.data, ...prev]);
        setMessage('Course created successfully.');
      }

      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save course');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setForm({
      title: course.title || '',
      category: course.category || '',
      description: course.description || '',
      longDescription: course.longDescription || '',
      price: course.price || '',
      oldPrice: course.oldPrice || '',
      status: course.status || 'Published',
      level: course.level || 'Beginner',
      instructor: course.instructor || '',
      instructorInitials: course.instructorInitials || '',
      emoji: course.emoji || '📘',
      color: course.color || '#4f46e5',
      color2: course.color2 || '#ec4899',
      stock: course.stock || 0,
      tags: (course.tags || []).join(', '),
      thumbnailUrl: course.thumbnailUrl || '',
      thumbnailFile: null
    });
    setMessage('');
    setError('');
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm('Delete this course? This cannot be undone.')) return;

    try {
      setDeletingId(courseId);
      setError('');
      await api.delete(`/admin/courses/${courseId}`);
      setCourses((prev) => prev.filter((course) => course._id !== courseId && course.id !== courseId));
      setMessage('Course deleted successfully.');
      if (selectedCourse && (selectedCourse._id === courseId || selectedCourse.id === courseId)) {
        resetForm();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete course');
    } finally {
      setDeletingId(null);
    }
  };

  if (!user || user.role !== 'admin') return null;

  return (
    <ProtectedRoute adminOnly={true}>
      <div className="gm-admin-container">
        <AdminSidebar active="courses" />
        <div className="gm-admin-content">
          <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8, color: '#0f172a' }}>Admin Courses</h1>
          <p style={{ color: '#64748b', marginBottom: 18, fontWeight: 500 }}>Create, edit, and manage all published courses.</p>

          <div style={{ marginBottom: 20, padding: 20, background: '#f8fafc', borderRadius: 18, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'grid', gap: 18 }}>
              <div>
                <h2 style={{ fontSize: 18, fontWeight: 800, marginBottom: 12, color: '#0f172a' }}>{selectedCourse ? 'Edit Course' : 'Create Course'}</h2>
                <div style={{ display: 'grid', gap: 12 }}>
                  <input
                    value={form.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Course title"
                    style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
                  />
                  <input
                    value={form.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    placeholder="Category"
                    style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
                  />
                  <textarea
                    value={form.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Short description"
                    rows={3}
                    style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15, resize: 'vertical' }}
                  />
                  <textarea
                    value={form.longDescription}
                    onChange={(e) => handleInputChange('longDescription', e.target.value)}
                    placeholder="Long description"
                    rows={4}
                    style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15, resize: 'vertical' }}
                  />
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <input
                      value={form.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      placeholder="Price"
                      type="number"
                      min="0"
                      style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
                    />
                    <input
                      value={form.oldPrice}
                      onChange={(e) => handleInputChange('oldPrice', e.target.value)}
                      placeholder="Old price"
                      type="number"
                      min="0"
                      style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <input
                      value={form.stock}
                      onChange={(e) => handleInputChange('stock', e.target.value)}
                      placeholder="Stock"
                      type="number"
                      min="0"
                      style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
                    />
                    <input
                      value={form.tags}
                      onChange={(e) => handleInputChange('tags', e.target.value)}
                      placeholder="Tags (comma-separated)"
                      style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <input
                      value={form.instructor}
                      onChange={(e) => handleInputChange('instructor', e.target.value)}
                      placeholder="Instructor name"
                      style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
                    />
                    <input
                      value={form.instructorInitials}
                      onChange={(e) => handleInputChange('instructorInitials', e.target.value)}
                      placeholder="Instructor initials"
                      style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                    <input
                      value={form.emoji}
                      onChange={(e) => handleInputChange('emoji', e.target.value)}
                      placeholder="Emoji"
                      style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
                    />
                    <input
                      value={form.color}
                      onChange={(e) => handleInputChange('color', e.target.value)}
                      placeholder="Accent color"
                      style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
                    />
                    <input
                      value={form.color2}
                      onChange={(e) => handleInputChange('color2', e.target.value)}
                      placeholder="Accent color 2"
                      style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
                    />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <select
                      value={form.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                      <option value="Archived">Archived</option>
                    </select>
                    <select
                      value={form.level}
                      onChange={(e) => handleInputChange('level', e.target.value)}
                      style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: 8, color: '#334155', fontWeight: 600 }}>Thumbnail image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleInputChange('thumbnailFile', e.target.files?.[0] || null)}
                      style={{ width: '100%', padding: 12, borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 15 }}
                    />
                    {form.thumbnailUrl && !form.thumbnailFile && (
                      <div style={{ marginTop: 10, color: '#64748b', fontSize: 14 }}>Current thumbnail: {form.thumbnailUrl}</div>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
                      style={{ padding: '12px 18px', borderRadius: 12, border: 'none', background: '#4f46e5', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
                    >
                      {saving ? 'Saving…' : selectedCourse ? 'Update Course' : 'Create Course'}
                    </button>
                    {selectedCourse && (
                      <button
                        type="button"
                        onClick={resetForm}
                        style={{ padding: '12px 18px', borderRadius: 12, border: '1px solid #cbd5e1', background: '#fff', color: '#0f172a', fontWeight: 700, cursor: 'pointer' }}
                      >
                        Cancel Edit
                      </button>
                    )}
                    {message && <div style={{ color: '#047857', fontWeight: 600 }}>{message}</div>}
                    {error && <div style={{ color: '#b91c1c', fontWeight: 700 }}>{error}</div>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {loading ? (
            <div style={{ background: 'white', border: '1px solid var(--bdr)', borderRadius: 18, padding: 20 }}>Loading courses...</div>
          ) : (
            <div style={{ background: 'white', border: '1px solid var(--bdr)', borderRadius: 18, overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ textAlign: 'left', padding: 14, color: '#0f172a' }}>Title</th>
                    <th style={{ textAlign: 'left', padding: 14, color: '#0f172a' }}>Category</th>
                    <th style={{ textAlign: 'right', padding: 14, color: '#0f172a' }}>Price</th>
                    <th style={{ textAlign: 'right', padding: 14, color: '#0f172a' }}>Stock</th>
                    <th style={{ textAlign: 'right', padding: 14, color: '#0f172a' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <tr key={course._id || course.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: 14, fontWeight: 700, color: '#0f172a' }}>{course.title}</td>
                      <td style={{ padding: 14, color: '#64748b' }}>{course.category || '—'}</td>
                      <td style={{ padding: 14, textAlign: 'right', fontWeight: 700, color: '#4f46e5' }}>{course.price ?? '0'}</td>
                      <td style={{ padding: 14, textAlign: 'right', color: '#0f172a' }}>{course.stock ?? 0}</td>
                      <td style={{ padding: 14, textAlign: 'right', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <button
                          type="button"
                          onClick={() => handleEdit(course)}
                          style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#fff', color: '#0f172a', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(course._id || course.id)}
                          disabled={deletingId === (course._id || course.id)}
                          style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid #f1f5f9', background: '#fee2e2', color: '#b91c1c', fontWeight: 700, cursor: 'pointer' }}
                        >
                          {deletingId === (course._id || course.id) ? 'Deleting…' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {courses.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ padding: 18, color: '#64748b', fontWeight: 700 }}>No courses found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default AdminCourses;

