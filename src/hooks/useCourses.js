import { useState, useEffect } from 'react';
import api from '../api';

const normalizeCourseData = (course) => {
  const instructor = course.instructor || 'Instructor';
  const title = course.title || course.name || 'Untitled Course';
  const category = course.category || course.cat || course.catTag || 'General';

  return {
    ...course,
    id: course._id || course.id,
    title,
    cat: course.cat || course.category || course.catTag || category,
    catTag: course.catTag || course.category || course.cat || '',
    color: course.color || 'linear-gradient(135deg, #4f46e5, #7c3aed)',
    emoji: course.emoji || '??',
    oldPrice: course.oldPrice ?? course.price,
    instructor,
    instructorInitials: course.instructorInitials || instructor.split(' ').map(part => part[0] || '').join('').toUpperCase(),
    students: course.students ?? 0,
    rating: course.rating ?? 0,
    reviews: course.reviews ?? 0,
    duration: course.duration || '40 hours',
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
