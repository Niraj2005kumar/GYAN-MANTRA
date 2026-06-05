const { db } = require('../config/firebase');

const paymentsCollection = db.collection('payments');

class Payment {
  constructor(data = {}) {
    this._id = data._id || data.id || null;
    this.paymentId = data.paymentId || null;
    this.orderId = data.orderId || null;
    this.userId = data.userId;
    this.userName = data.userName || '';
    this.userEmail = data.userEmail || '';

    this.courseId = data.courseId;
    this.courseTitle = data.courseTitle || '';

    this.amount = data.amount;

    this.currency = data.currency || 'INR';

    this.paymentMethod = data.paymentMethod || 'UPI';

    this.status = data.status || 'pending';
    this.receipt = data.receipt || null;
    this.notes = data.notes || {};
    this.createdAt = data.createdAt
      ? typeof data.createdAt.toDate === 'function'
        ? data.createdAt.toDate()
        : new Date(data.createdAt)
      : new Date();
    this.completedAt = data.completedAt
      ? typeof data.completedAt.toDate === 'function'
        ? data.completedAt.toDate()
        : new Date(data.completedAt)
      : null;
  }

  async save() {
    if (!this._id) {
      const docRef = paymentsCollection.doc();
      this._id = docRef.id;
    }

    await paymentsCollection.doc(this._id).set({
      paymentId: this.paymentId,
      orderId: this.orderId,

      userId: this.userId,
      userName: this.userName,
      userEmail: this.userEmail,

      courseId: this.courseId,
      courseTitle: this.courseTitle,

      amount: this.amount,
      currency: this.currency,

      paymentMethod: this.paymentMethod,

      status: this.status,

      receipt: this.receipt,
      notes: this.notes,
      createdAt: this.createdAt,
      completedAt: this.completedAt
    }, { merge: false });

    return this;
  }

  static async findById(id) {
    const doc = await paymentsCollection.doc(id).get();
    if (!doc.exists) return null;
    return new Payment({ ...doc.data(), _id: doc.id });
  }

  static async findByOrderId(orderId) {
    const query = await paymentsCollection.where('orderId', '==', orderId).get();
    if (query.empty) return null;
    const doc = query.docs[0];
    return new Payment({ ...doc.data(), _id: doc.id });
  }

  static async findByPaymentId(paymentId) {
    const query = await paymentsCollection.where('paymentId', '==', paymentId).get();
    if (query.empty) return null;
    const doc = query.docs[0];
    return new Payment({ ...doc.data(), _id: doc.id });
  }

  static async findByUserIdAndCourseId(userId, courseId) {
    const query = await paymentsCollection
      .where('userId', '==', userId)
      .where('courseId', '==', courseId)
      .where('status', '==', 'success')
      .get();
    if (query.empty) return null;
    return query.docs.map(doc => new Payment({ ...doc.data(), _id: doc.id }));
  }

  static async findByUserId(userId) {
    const query = await paymentsCollection.where('userId', '==', userId).get();
    if (query.empty) return [];
    return query.docs.map(doc => new Payment({ ...doc.data(), _id: doc.id }));
  }

  static async findSuccessfulPayments() {
    const query = await paymentsCollection.where('status', '==', 'success').get();
    if (query.empty) return [];
    return query.docs.map(doc => new Payment({ ...doc.data(), _id: doc.id }));
  }

  static async findRecentPayments(limit = 10) {
    const query = await paymentsCollection
      .where('status', '==', 'success')
      .orderBy('completedAt', 'desc')
      .limit(limit)
      .get();
    if (query.empty) return [];
    return query.docs.map(doc => new Payment({ ...doc.data(), _id: doc.id }));
  }

  static async getRevenueSummary() {
    const payments = await Payment.findSuccessfulPayments();
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);
    return {
      totalRevenue,
      totalPayments: payments.length,
      payments
    };
  }

  static async getRevenueForToday() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const payments = await paymentsCollection
      .where('status', '==', 'success')
      .where('completedAt', '>=', today)
      .where('completedAt', '<', tomorrow)
      .get();

    if (payments.empty) return 0;
    return payments.docs.reduce((sum, doc) => sum + (doc.data().amount || 0), 0);
  }

  static async getRevenueForMonth(year, month) {
    const startDate = new Date(year, month, 1);
    const endDate = new Date(year, month + 1, 1);

    const payments = await paymentsCollection
      .where('status', '==', 'success')
      .where('completedAt', '>=', startDate)
      .where('completedAt', '<', endDate)
      .get();

    if (payments.empty) return 0;
    return payments.docs.reduce((sum, doc) => sum + (doc.data().amount || 0), 0);
  }
}

module.exports = Payment;
