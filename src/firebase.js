// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkRba2ZK9SH8VPeTqL9JPGD4pFLmyk-XM",
  authDomain: "gyan-mantra-890d8.firebaseapp.com",
  projectId: "gyan-mantra-890d8",
  storageBucket: "gyan-mantra-890d8.firebasestorage.app",
  messagingSenderId: "918081703301",
  appId: "1:918081703301:web:548de268cde680ebf788ec",
  measurementId: "G-CZ0XSLG24E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
