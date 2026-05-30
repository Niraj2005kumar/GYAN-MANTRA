let db;

try {
  const { admin } = require('../firebase-admin');
  
  if (admin && typeof admin.firestore === 'function') {
    db = admin.firestore();
    console.log('✅ Firestore Connected');
  } else {
    console.log('⚠️ Firebase Admin SDK not initialized. Using mock database.');
    // Create a mock database for development
    db = createMockFirestore();
  }
} catch (error) {
  console.log('⚠️ Firebase initialization failed:', error.message);
  console.log('Using mock database for development.');
  db = createMockFirestore();
}

// Mock Firestore for development
function createMockFirestore() {
  const mockData = {};
  
  return {
    collection: (collectionName) => ({
      doc: (docId) => ({
        get: async () => ({
          exists: false,
          data: () => null,
          id: docId
        }),
        set: async (data) => {
          if (!mockData[collectionName]) mockData[collectionName] = {};
          mockData[collectionName][docId] = data;
        },
        update: async (data) => {
          if (!mockData[collectionName]) mockData[collectionName] = {};
          if (mockData[collectionName][docId]) {
            mockData[collectionName][docId] = { ...mockData[collectionName][docId], ...data };
          }
        },
        delete: async () => {
          if (mockData[collectionName]) {
            delete mockData[collectionName][docId];
          }
        }
      }),
      get: async () => ({
        empty: true,
        docs: []
      }),
      where: () => ({
        limit: () => ({
          get: async () => ({
            empty: true,
            docs: []
          })
        }),
        get: async () => ({
          empty: true,
          docs: []
        })
      })
    })
  };
}

module.exports = { db };
