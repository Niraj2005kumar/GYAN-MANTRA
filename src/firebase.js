// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCLyBA3DMmPk8qtJxY3miB0GlDthH8mLg",
  authDomain: "gyan-mantra-d53e5.firebaseapp.com",
  projectId: "gyan-mantra-d53e5",
  storageBucket: "gyan-mantra-d53e5.firebasestorage.app",
  messagingSenderId: "671299181024",
  appId: "1:671299181024:web:c48384915e9cb47cd8b385",
  measurementId: "G-JS3Z6J7W7L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
