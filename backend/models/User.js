const bcrypt = require('bcryptjs');
const { db } = require('../config/firebase');

const usersCollection = db.collection('users');

class User {
  constructor(data = {}) {
    this._id = data._id || data.id || null;
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.firebaseId = data.firebaseId;
    this.role = data.role || 'student';
    this.enrolledCourses = data.enrolledCourses || [];
    this.createdAt = data.createdAt
      ? typeof data.createdAt.toDate === 'function'
        ? data.createdAt.toDate()
        : new Date(data.createdAt)
      : new Date();
  }

  async save() {
    if (this.password && !this.password.startsWith('$2a') && this.password !== 'firebase-auth') {
      this.password = await bcrypt.hash(this.password, 10);
    }

    if (!this._id) {
      const docRef = usersCollection.doc();
      this._id = docRef.id;
    }

    await usersCollection.doc(this._id).set({
      name: this.name,
      email: this.email,
      password: this.password,
      firebaseId: this.firebaseId,
      role: this.role,
      enrolledCourses: this.enrolledCourses,
      createdAt: this.createdAt
    });

    return this;
  }

  static async findOne(query = {}) {
    if (query._id || query.id) {
      const doc = await usersCollection.doc(query._id || query.id).get();
      if (!doc.exists) return null;
      return new User({ ...doc.data(), _id: doc.id });
    }

    let q = usersCollection;
    if (query.email) q = q.where('email', '==', query.email);
    if (query.firebaseId) q = q.where('firebaseId', '==', query.firebaseId);

    const snapshot = await q.limit(1).get();
    if (snapshot.empty) return null;

    const doc = snapshot.docs[0];
    return new User({ ...doc.data(), _id: doc.id });
  }

  static async findById(id) {
    const doc = await usersCollection.doc(id).get();
    if (!doc.exists) return null;
    const user = new User({ ...doc.data(), _id: doc.id });
    
    // Add select method for compatibility
    user.select = function(selection) {
      if (selection === '-password') {
        const userData = {
          _id: this._id,
          name: this.name,
          email: this.email,
          firebaseId: this.firebaseId,
          role: this.role,
          enrolledCourses: this.enrolledCourses,
          createdAt: this.createdAt
        };
        return userData;
      }
      return user;
    };
    
    return user;
  }
}

module.exports = User;
