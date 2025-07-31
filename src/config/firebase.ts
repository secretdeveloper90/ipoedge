// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3-FzhXOxx7SXpR55Qe7ouEpw1ugbaMuQ",
  authDomain: "ipoedge-bc257.firebaseapp.com",
  projectId: "ipoedge-bc257",
  storageBucket: "ipoedge-bc257.firebasestorage.app",
  messagingSenderId: "493431123278",
  appId: "1:493431123278:web:260f9c0eb016fdbab7c21f",
  measurementId: "G-59GRG7H6BJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Initialize Analytics (only in browser environment)
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Export the app instance
export default app;
