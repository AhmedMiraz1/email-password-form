// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB00Z6O8I5XXnAEwRA1Eq4jOmjGl3NDK3Q",
  authDomain: "user-email-password-auth-bf5ec.firebaseapp.com",
  projectId: "user-email-password-auth-bf5ec",
  storageBucket: "user-email-password-auth-bf5ec.appspot.com",
  messagingSenderId: "790450140454",
  appId: "1:790450140454:web:95b1d903d3004eeeb5fde7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
export default auth