const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

let initialized = false;
const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY
  ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)
  : null;
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH || 'serviceAccountKey.json';

if (serviceAccountKey) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey)
  });
  initialized = true;
} else if (serviceAccountPath) {
  const resolvedPath = path.isAbsolute(serviceAccountPath)
    ? serviceAccountPath
    : path.join(__dirname, serviceAccountPath);

  if (fs.existsSync(resolvedPath)) {
    const serviceAccountFile = fs.readFileSync(resolvedPath, 'utf8');
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(serviceAccountFile))
    });
    initialized = true;
  } else if (process.env.FIREBASE_SERVICE_ACCOUNT_PATH) {
    throw new Error(`Firebase service account file not found at path: ${resolvedPath}`);
  }
}

if (!initialized) {
  console.log('🔥 Using mock Firebase auth setup for development');

  const mockAuth = {
    verifyIdToken: async (token) => ({
      uid: 'mock-uid-' + Date.now(),
      email: 'mock@example.com'
    })
  };

  module.exports = {
    admin: { auth: () => mockAuth },
    auth: mockAuth
  };
} else {
  const auth = admin.auth();
  module.exports = { admin, auth };
}
