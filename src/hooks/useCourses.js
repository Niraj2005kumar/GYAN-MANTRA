import { useState, useEffect } from 'react';
import api from '../api';

const normalizeCourseData = (course) => {
  const instructor = course.instructor || 'Instructor';
  const title = course.title || course.name || 'Untitled Course';
  const category = course.category || course.cat || course.catTag || 'General';
  const parseDuration = (d) => {
    if (!d) return 0;
    const s = String(d).trim();
    const hoursMatch = s.match(/(\d+(?:\.\d+)?)\s*hours?/i);
    if (hoursMatch) return Math.round(parseFloat(hoursMatch[1]) * 3600);
    const minsMatch = s.match(/(\d+(?:\.\d+)?)\s*mins?/i);
    if (minsMatch) return Math.round(parseFloat(minsMatch[1]) * 60);
    if (s.includes(':')) {
      const parts = s.split(':').map(p => parseInt(p, 10) || 0);
      if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
      if (parts.length === 2) return parts[0] * 60 + parts[1];
    }
    const num = parseInt(s, 10);
    if (!isNaN(num)) return num;
    return 0;
  };

  const formatSeconds = (sec) => {
    if (!sec || sec <= 0) return '00:00';
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;
    if (hours > 0) return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  let computedDuration = '';
  if (course.duration) {
    computedDuration = course.duration;
  } else if (Array.isArray(course.videos) && course.videos.length > 0) {
    const totalSec = course.videos.reduce((acc, v) => acc + parseDuration(v.duration), 0);
    if (totalSec > 0) computedDuration = formatSeconds(totalSec);
  }

  return {
    ...course,
    id: course._id || course.id,
    title,
    cat: course.cat || course.category || course.catTag || category,
    catTag: course.catTag || course.category || course.cat || '',
    color: course.color || 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    emoji: course.emoji || '📚',
    oldPrice: course.oldPrice ?? course.price,
    instructor,
    instructorInitials: course.instructorInitials || instructor.split(' ').map(part => part[0] || '').join('').toUpperCase(),
    students: course.students ?? 0,
    rating: course.rating ?? 0,
    reviews: course.reviews ?? 0,
    duration: computedDuration || '00:00',
    description: course.description || '',
    longDescription: course.longDescription || course.description || '' ,
    level: course.level || 'Intermediate',
    thumbnail: course.thumbnail || 'https://picsum.photos/id/100/300/200'
  };
};

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await api.get('/courses');
        const normalized = (response.data || []).map(normalizeCourseData);
        setCourses(normalized);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  return { courses, loading };
};

export default useCourses;
