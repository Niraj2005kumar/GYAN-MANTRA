import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
import api, { setAuthToken } from '../api';
import { auth } from '../firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// Map Firebase Auth error codes to user-friendly messages
export const getFirebaseError = (error) => {
  const code = error?.code || '';
  const messages = {
    'auth/invalid-email': 'Invalid email address format.',
    'auth/user-not-found': 'No account found with this email. Please sign up first.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/invalid-credential': 'Incorrect email or password. Please try again.',
    'auth/email-already-in-use': 'An account with this email already exists. Please log in instead.',
    'auth/weak-password': 'Password must be at least 6 characters.',
    'auth/too-many-requests': 'Too many failed attempts. Please wait a few minutes and try again.',
    'auth/network-request-failed': 'Network error. Please check your internet connection.',
    'auth/user-disabled': 'This account has been disabled. Contact support.',
    'auth/operation-not-allowed': 'Email/Password sign-in is not enabled. Please enable it in Firebase Console.',
    'auth/configuration-not-found': 'Firebase Authentication is not configured. Enable Email/Password in the Firebase Console → Authentication → Sign-in method.',
    'auth/popup-closed-by-user': 'Sign-in popup was closed before completing.',
    'auth/internal-error': 'An internal error occurred. Please try again.',
  };
  return messages[code] || error?.message || 'An unexpected error occurred. Please try again.';
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // This ref prevents onAuthStateChanged from overwriting state
  // while login() or signup() is actively managing the session.
  const isManagingAuth = useRef(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      // Skip if login/signup is currently handling auth state to avoid race condition
      if (isManagingAuth.current) return;

      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken();
          setAuthToken(token);
          const response = await api.get('/auth/me');
          setUser(response.data.user);
        } catch (error) {
          // Backend unreachable or returned error — fall back to Firebase user data.
          // This keeps the user logged in even if the backend is temporarily down.
          console.warn('Backend profile fetch failed, using Firebase data as fallback:', error.message);
          setUser({
            id: firebaseUser.uid,
            name: firebaseUser.displayName || 'Student',
            email: firebaseUser.email,
            role:
              firebaseUser.email === 'admin@gyanmantra.com' ||
              firebaseUser.email === 'admin@edunova.com'
                ? 'admin'
                : 'student'
          });
        }
      } else {
        // Firebase says no user is logged in — clear everything
        setUser(null);
        setAuthToken(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    // Signal to onAuthStateChanged that we are handling this auth event
    isManagingAuth.current = true;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const token = await userCredential.user.getIdToken();
      setAuthToken(token);

      let userData;
      try {
        const response = await api.get('/auth/me');
        userData = response.data.user;
      } catch (backendError) {
        // Backend unavailable — construct user from Firebase token data
        console.warn('Backend /auth/me failed during login, using Firebase fallback:', backendError.message);
        userData = {
          id: userCredential.user.uid,
          name: userCredential.user.displayName || 'Student',
          email: userCredential.user.email,
          role:
            email === 'admin@gyanmantra.com' || email === 'admin@edunova.com'
              ? 'admin'
              : 'student'
        };
      }

      setUser(userData);
      setLoading(false);
      return userData;
    } finally {
      // Always release the lock so onAuthStateChanged can work normally again
      isManagingAuth.current = false;
    }
  };

  const signup = async (name, email, password) => {
    isManagingAuth.current = true;
    try {
      // 1. Create Firebase Auth account
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // 2. Set display name
      await updateProfile(userCredential.user, { displayName: name });

      // 3. Force-refresh token so it includes the updated displayName claim
      const token = await userCredential.user.getIdToken(true);
      setAuthToken(token);

      // 4. Create user profile document in backend/Firestore
      let userData;
      try {
        const response = await api.post('/auth/signup', { name, email });
        userData = response.data.user;
      } catch (backendError) {
        // Backend sync failed — construct user from what we know
        console.warn('Backend /auth/signup failed, using Firebase fallback:', backendError.message);
        userData = {
          id: userCredential.user.uid,
          name,
          email,
          role:
            email === 'admin@gyanmantra.com' || email === 'admin@edunova.com'
              ? 'admin'
              : 'student'
        };
      }

      setUser(userData);
      setLoading(false);
      return userData;
    } finally {
      isManagingAuth.current = false;
    }
  };

  const logout = async () => {
    // Clear state immediately for instant UI feedback
    setUser(null);
    setAuthToken(null);
    await signOut(auth);
  };

  const value = { user, loading, login, signup, logout };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
