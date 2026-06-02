let activeDb;
let isMock = false;

const mockDb = createMockFirestore();

try {
  const { admin } = require('../firebase-admin');
  
  if (admin && typeof admin.firestore === 'function') {
    const realDb = admin.firestore();
    console.log('✅ Firestore Connected');
    activeDb = realDb;
    
    // Start async connection verification
    async function checkConnection() {
      try {
        await realDb.collection('courses').limit(1).get();
        console.log('✅ Firestore Connection Verified Succeeded. Using real database.');
      } catch (err) {
        console.warn('⚠️ Firestore Authentication Failed (Invalid Credentials or Revoked Key).');
        console.warn('🔄 Falling back to Mock Database for seamless local development.');
        activeDb = mockDb;
        isMock = true;
      }
    }
    checkConnection();
  } else {
    console.log('⚠️ Firebase Admin SDK not initialized. Using mock database.');
    activeDb = mockDb;
    isMock = true;
  }
} catch (error) {
  console.log('⚠️ Firebase initialization failed:', error.message);
  console.log('Using mock database for development.');
  activeDb = mockDb;
  isMock = true;
}

// Dynamic transparent Proxy so startup-time initialized models automatically route queries
const db = {
  collection: (name) => {
    return new Proxy({}, {
      get: (target, prop) => {
        const activeCollection = activeDb.collection(name);
        const value = activeCollection[prop];
        if (typeof value === 'function') {
          return value.bind(activeCollection);
        }
        return value;
      }
    });
  }
};

// Mock Firestore for development
function createMockFirestore() {
  const mockData = {
    courses: {
      'course-1': {
        title: 'Full Stack Web Development',
        description: 'Master HTML, CSS, JavaScript, React, Node.js and Firebase from scratch.',
        longDescription: 'This comprehensive course will take you from absolute beginner to building and deploying modern full-stack web applications. Learn Frontend React, Backend Node/Express, and Firebase Authentication and database systems.',
        price: 499,
        oldPrice: 999,
        duration: '42 hours',
        rating: 4.8,
        reviews: 1250,
        instructor: 'Dr. Angela Yu',
        instructorInitials: 'AY',
        emoji: '💻',
        color: '#4f46e5',
        color2: '#7c3aed',
        category: 'Web Development',
        level: 'Beginner to Advanced',
        syllabus: ['HTML/CSS Essentials', 'JavaScript Deep Dive', 'React and SPA Architecture', 'Node.js/Express Backend API development', 'Firebase Database and Authentication Integration'],
        thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97',
        status: 'Published',
        students: 2350,
        videos: [
          { title: '1. Welcome and Course Overview', duration: '08:45', url: 'welcome.mp4' },
          { title: '2. Setting Up Your Development Environment', duration: '12:30', url: 'setup.mp4' },
          { title: '3. Understanding Frontend and Backend Architectures', duration: '20:15', url: 'arch.mp4' }
        ],
        createdAt: new Date().toISOString()
      },
      'course-2': {
        title: 'Advanced React and State Management',
        description: 'Learn Hooks, Context API, Redux Toolkit, and performance optimizations.',
        longDescription: 'Deep dive into React core concepts. Master component optimization, custom hooks, global state patterns, routing, code splitting, and building custom production-level configurations.',
        price: 299,
        oldPrice: 599,
        duration: '28 hours',
        rating: 4.9,
        reviews: 840,
        instructor: 'Kent C. Dodds',
        instructorInitials: 'KD',
        emoji: '⚛️',
        color: '#0ea5e9',
        color2: '#2563eb',
        category: 'Frontend',
        level: 'Intermediate to Advanced',
        syllabus: ['React Engine Under the Hood', 'Custom Hooks & State Machines', 'Context API & Performance Gotchas', 'Redux Toolkit Architecture', 'Concurrent Mode and Server Components'],
        thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee',
        status: 'Published',
        students: 1420,
        videos: [
          { title: '1. Course Introduction', duration: '05:20', url: 'intro.mp4' },
          { title: '2. React Render Lifecycle and Profiler', duration: '18:40', url: 'lifecycle.mp4' }
        ],
        createdAt: new Date().toISOString()
      }
    },
    users: {},
    enrollments: {}
  };
  
  return {
    collection: (collectionName) => {
      if (!mockData[collectionName]) mockData[collectionName] = {};
      
      const getDocsList = (records) => {
        return Object.keys(records).map(id => ({
          id,
          exists: true,
          data: () => ({ ...records[id] })
        }));
      };

      return {
        doc: (docId) => {
          const id = docId || Math.random().toString(36).substring(7);
          return {
            id,
            get: async () => {
              const exists = !!mockData[collectionName][id];
              return {
                exists,
                id,
                data: () => mockData[collectionName][id] ? { ...mockData[collectionName][id] } : null
              };
            },
            set: async (data) => {
              mockData[collectionName][id] = JSON.parse(JSON.stringify(data));
            },
            update: async (data) => {
              if (mockData[collectionName][id]) {
                mockData[collectionName][id] = { 
                  ...mockData[collectionName][id], 
                  ...JSON.parse(JSON.stringify(data)) 
                };
              }
            },
            delete: async () => {
              delete mockData[collectionName][id];
            }
          };
        },
        get: async () => {
          const docs = getDocsList(mockData[collectionName]);
          return {
            empty: docs.length === 0,
            docs
          };
        },
        where: function(field, op, value) {
          const conditions = [{ field, op, value }];
          const getDocsListLocal = (records) => {
            return Object.keys(records).map(id => ({
              id,
              exists: true,
              data: () => ({ ...records[id] })
            }));
          };
          
          const queryBuilder = {
            _limit: undefined,
            where: function(f, o, v) {
              conditions.push({ field: f, op: o, value: v });
              return this;
            },
            limit: function(num) {
              this._limit = num;
              return this;
            },
            get: async function() {
              let records = { ...mockData[collectionName] };
              let filtered = {};
              
              Object.keys(records).forEach(id => {
                const data = records[id];
                let matches = true;
                
                conditions.forEach(cond => {
                  if (cond.op === '==') {
                    if (data[cond.field] !== cond.value) matches = false;
                  } else if (cond.op === '!=') {
                    if (data[cond.field] === cond.value) matches = false;
                  }
                });
                
                if (matches) {
                  filtered[id] = data;
                }
              });
              
              let docs = getDocsListLocal(filtered);
              if (this._limit !== undefined) {
                docs = docs.slice(0, this._limit);
              }
              
              return {
                empty: docs.length === 0,
                docs
              };
            }
          };
          
          return queryBuilder;
        }
      };
    }
  };
}

module.exports = { db };
