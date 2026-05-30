const { db } = require('../config/firebase');

const enrollmentsCollection = db.collection('enrollments');

class Enrollment {
  constructor(data = {}) {
    this._id = data._id || data.id || null;
    this.userId = data.userId;
    this.courseId = data.courseId;
    this.progress = data.progress || 0;
    this.currentLesson = data.currentLesson || 0;
    this.completedLessons = data.completedLessons || [];
    this.userInfo = data.userInfo || null;
    this.courseInfo = data.courseInfo || null;
    this.lastAccessed = data.lastAccessed
      ? typeof data.lastAccessed.toDate === 'function'
        ? data.lastAccessed.toDate()
        : new Date(data.lastAccessed)
      : new Date();
    this.completedAt = data.completedAt
      ? typeof data.completedAt.toDate === 'function'
        ? data.completedAt.toDate()
        : new Date(data.completedAt)
      : null;
    this.enrolledAt = data.enrolledAt
      ? typeof data.enrolledAt.toDate === 'function'
        ? data.enrolledAt.toDate()
        : new Date(data.enrolledAt)
      : new Date();
  }

  async save() {
    if (!this._id) {
      const docRef = enrollmentsCollection.doc();
      this._id = docRef.id;
    }

    await enrollmentsCollection.doc(this._id).set({
      userId: this.userId,
      courseId: this.courseId,
      progress: this.progress,
      currentLesson: this.currentLesson,
      completedLessons: this.completedLessons,
      userInfo: this.userInfo,
      courseInfo: this.courseInfo,
      lastAccessed: this.lastAccessed,
      completedAt: this.completedAt,
      enrolledAt: this.enrolledAt
    });

    return this;
  }

  static async findOne(query = {}) {
    if (query._id || query.id) {
      const doc = await enrollmentsCollection.doc(query._id || query.id).get();
      if (!doc.exists) return null;
      return new Enrollment({ ...doc.data(), _id: doc.id });
    }

    let q = enrollmentsCollection;
    if (query.userId) q = q.where('userId', '==', query.userId);
    if (query.courseId) q = q.where('courseId', '==', query.courseId);

    const snapshot = await q.limit(1).get();
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return new Enrollment({ ...doc.data(), _id: doc.id });
  }

  static find(query = {}) {
    let q = enrollmentsCollection;
    if (query.userId) q = q.where('userId', '==', query.userId);
    if (query.courseId) q = q.where('courseId', '==', query.courseId);

    return {
      populate: async (field) => {
        const snapshot = await q.get();
        const docs = snapshot.docs.map(doc => new Enrollment({ ...doc.data(), _id: doc.id }));

        if (field === 'courseId') {
          const Course = require('./Course');
          for (const enrollment of docs) {
            if (enrollment.courseId) {
              const course = await Course.findById(enrollment.courseId);
              if (course) {
                // Add toObject method to course for compatibility
                course.toObject = function() {
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
                };
                enrollment.courseId = course;
              }
            }
          }
        }

        return docs;
      }
    };
  }
}

module.exports = Enrollment;
