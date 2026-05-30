const { db } = require('./config/firebase');

const connectDB = async () => {
  try {
    if (!db) {
      throw new Error('Firestore database not initialized');
    }
    console.log('Firestore Connected ✅');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
