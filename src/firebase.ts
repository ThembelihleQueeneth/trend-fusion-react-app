// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeT4gryrkzkSyRTri6j2VJy1YHdRQ_QEs",
  authDomain: "trend-fusion-61764.firebaseapp.com",
  projectId: "trend-fusion-61764",
  storageBucket: "trend-fusion-61764.firebasestorage.app",
  messagingSenderId: "165596683297",
  appId: "1:165596683297:web:74724dca567eaad40c1760",
  measurementId: "G-Q387HW3QNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);