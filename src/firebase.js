// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8Qa7CI7SDt9lwj1NtA3Qbj5VqYN51WFM",
  authDomain: "cielapp-778dc.firebaseapp.com",
  projectId: "cielapp-778dc",
  storageBucket: "cielapp-778dc.appspot.com",
  messagingSenderId: "682226575369",
  appId: "1:682226575369:web:6f85deee8e0b96a8cd30d8",
  measurementId: "G-9FG8RFMWT2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
