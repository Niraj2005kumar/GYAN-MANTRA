const { db } = require('../config/firebase');

const coursesCollection = db.collection('courses');

class Course {
  constructor(data = {}) {
    this._id = data._id || data.id || null;
    this.title = data.title || '';
    this.description = data.description || '';
    this.videoUrl = data.videoUrl || '';
    this.longDescription = data.longDescription || '';
    this.price = data.price || 0;
    this.oldPrice = data.oldPrice || 0;
    this.duration = data.duration || 0;
    this.rating = data.rating || 0;
    this.reviews = data.reviews || 0;
    this.instructor = data.instructor || '';
    this.instructorInitials = data.instructorInitials || '';
    this.emoji = data.emoji || '';
    this.color = data.color || '';
    this.color2 = data.color2 || '';
    this.category = data.category || '';
    this.level = data.level || '';
    this.syllabus = data.syllabus || [];
    this.thumbnail = data.thumbnail || '';
    this.status = data.status || 'Published';
    this.students = data.students || 0;
    this.videos = data.videos || [];
    this.createdAt = data.createdAt
      ? typeof data.createdAt.toDate === 'function'
        ? data.createdAt.toDate()
        : new Date(data.createdAt)
      : new Date();
  }

  async save() {
    if (!this._id) {
      const docRef = coursesCollection.doc();
      this._id = docRef.id;
    }

    await coursesCollection.doc(this._id).set({
      title: this.title,
      description: this.description,
      videoUrl: this.videoUrl || '',
      longDescription: this.longDescription,
      price: this.price,
      oldPrice: this.oldPrice,
      duration: this.duration,
      rating: this.rating,
      reviews: this.reviews,
      instructor: this.instructor,
      instructorInitials: this.instructorInitials,
      emoji: this.emoji,
      color: this.color,
      color2: this.color2,
      category: this.category,
      level: this.level,
      syllabus: this.syllabus,
      thumbnail: this.thumbnail,
      status: this.status,
      students: this.students,
      videos: this.videos,
      createdAt: this.createdAt
    });

    return this;
  }

  static async find() {
    const snapshot = await coursesCollection.get();
    return snapshot.docs.map(doc => new Course({ ...doc.data(), _id: doc.id }));
  }

  static async findById(id) {
    const doc = await coursesCollection.doc(id).get();
    if (!doc.exists) return null;
    return new Course({ ...doc.data(), _id: doc.id });
  }

  static async findByIdAndUpdate(id, data) {
    const course = await Course.findById(id);
    if (!course) return null;
    
    // Update only the provided fields
    const updateData = {};
    const allowedFields = ['title', 'description', 'videoUrl', 'longDescription', 'price', 'oldPrice', 'duration', 'rating', 'reviews', 'instructor', 'instructorInitials', 'emoji', 'color', 'color2', 'category', 'level', 'syllabus', 'thumbnail', 'status', 'students', 'videos'];
    
    allowedFields.forEach(field => {
      if (field in data) {
        updateData[field] = data[field];
      }
    });
    
    await coursesCollection.doc(id).update(updateData);
    return Course.findById(id);
  }

  static async findByIdAndDelete(id) {
    await coursesCollection.doc(id).delete();
  }

  toObject() {
    return {
      _id: this._id,
      title: this.title,
      description: this.description,
      videoUrl: this.videoUrl,
      longDescription: this.longDescription,
      price: this.price,
      oldPrice: this.oldPrice,
      duration: this.duration,
      rating: this.rating,
      reviews: this.reviews,
      instructor: this.instructor,
      instructorInitials: this.instructorInitials,
      emoji: this.emoji,
      color: this.color,
      color2: this.color2,
      category: this.category,
      level: this.level,
      syllabus: this.syllabus,
      thumbnail: this.thumbnail,
      status: this.status,
      students: this.students,
      videos: this.videos,
      createdAt: this.createdAt
    };
  }
}

module.exports = Course;
