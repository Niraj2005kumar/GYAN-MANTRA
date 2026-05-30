# Firebase Integration Setup Guide

## ✅ What's Been Done

### Frontend (React)
1. ✅ Created `src/firebase.js` - Firebase initialization file with Auth, Firestore, and Storage
2. ✅ Updated `src/context/AuthContext.js` - Integrated Firebase Authentication
3. ✅ Installed Firebase SDK (`firebase` npm package)
4. ✅ Created `.env.local` with API URL configuration

### Backend (Node.js)
1. ✅ Installed Firebase Admin SDK (`firebase-admin` npm package)
2. ✅ Created `backend/firebase-admin.js` - Firebase Admin configuration
3. ✅ Updated `backend/routes/auth.js` - Added Firebase endpoints:
   - `POST /api/auth/signup-firebase` - Register with Firebase
   - `POST /api/auth/verify-firebase` - Login with Firebase
4. ✅ Updated `backend/models/User.js` - Added `firebaseId` field
5. ✅ Updated `backend/server.js` - Mounted auth routes
6. ✅ Updated `backend/.env` - Added Firebase service account placeholder

---

## 🔑 What You Need to Do Now

### Step 1: Get Firebase Service Account Key
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select **gyan-mantra-890d8** project
3. Go to **Project Settings** (gear icon) → **Service Accounts**
4. Click **Generate New Private Key**
5. Copy the entire JSON content

### Step 2: Update Backend .env
Open `backend/.env` and replace the Firebase comment with your service account key:

```env
FIREBASE_SERVICE_ACCOUNT_KEY={"type":"service_account","project_id":"gyan-mantra-890d8","..."}
```

**Important:** Keep the entire JSON on one line (remove newlines)

### Step 3: Enable Firebase Sign-in Methods
1. Go to Firebase Console → **gyan-mantra-890d8** project
2. Navigate to **Authentication** → **Sign-in method**
3. Enable:
   - ✅ Email/Password
4. Save changes

### Step 4: Test the Integration

#### Start Backend:
```bash
cd backend
npm start
# or npm run dev if you have a dev script
```
Should see: `✅ MongoDB Connected Successfully!` and server running on port 5000

#### Start Frontend:
```bash
npm start
# Runs on http://localhost:3000
```

#### Test Firebase Auth:
1. Go to http://localhost:3000/signup
2. Create a new account with Firebase
3. Should redirect to dashboard after signup
4. Logout and login to test both endpoints

---

## 📁 File Structure

```
gyan mantra/
├── .env.local (Frontend config)
├── src/
│   ├── firebase.js (NEW - Firebase config)
│   └── context/
│       └── AuthContext.js (UPDATED - Firebase integration)
│
└── backend/
    ├── .env (UPDATED - Firebase service account)
    ├── firebase-admin.js (NEW - Admin SDK config)
    ├── server.js (UPDATED - Route mounting)
    ├── models/
    │   └── User.js (UPDATED - firebaseId field)
    └── routes/
        └── auth.js (UPDATED - Firebase endpoints)
```

---

## 🔄 How It Works

1. **User Signs Up via Frontend:**
   - React calls `auth.createUserWithEmailAndPassword()` (Firebase)
   - Gets Firebase ID token
   - Calls `POST /api/auth/signup-firebase` with token
   - Backend verifies token with Firebase Admin
   - Creates MongoDB user with firebaseId
   - Returns JWT token for API requests

2. **User Logs In:**
   - React calls `auth.signInWithEmailAndPassword()` (Firebase)
   - Gets Firebase ID token
   - Calls `POST /api/auth/verify-firebase` with token
   - Backend verifies and creates JWT
   - Frontend stores JWT locally for API calls

---

## 🚀 Environment Variables

### Frontend (.env.local)
- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5000/api)

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string ✅
- `JWT_SECRET` - JWT signing secret ✅
- `FIREBASE_SERVICE_ACCOUNT_KEY` - Firebase Admin credentials (⚠️ Add this)

---

## 🐛 Troubleshooting

### "Firebase app not initialized"
- Check `src/firebase.js` exists
- Verify Firebase config values are correct

### "Invalid Firebase token" error
- Ensure `FIREBASE_SERVICE_ACCOUNT_KEY` is set in backend `.env`
- Verify key format (single-line JSON)
- Check Firebase project ID matches config

### "User not found" on login
- User must sign up first
- Check MongoDB connection is working

### CORS errors
- Backend CORS is enabled
- Check frontend API URL in `.env.local` matches backend

---

## 💡 Next Steps (Optional)

1. **Add OAuth Providers:** Google, GitHub sign-in
2. **Email Verification:** Add verification before login
3. **Password Reset:** Implement forgot password
4. **Firestore Integration:** Store additional user data
5. **File Upload:** Use Firebase Storage for course materials

---

## 📞 Quick Commands

```bash
# Start backend
cd backend && npm start

# Start frontend
npm start

# Test API
curl http://localhost:5000/api/test

# View Firebase Console
https://console.firebase.google.com/project/gyan-mantra-890d8
```

**Everything is ready! Just add the Firebase Service Account Key and you're good to go! 🎉**
