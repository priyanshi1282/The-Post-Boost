// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe8DqVxXgRKtsdob28V8Js0Try5pXIeVg",
  authDomain: "the-social-good.firebaseapp.com",
  projectId: "the-social-good",
  storageBucket: "the-social-good.appspot.com",
  messagingSenderId: "351048528811",
  appId: "1:351048528811:web:d22a79a5f02684b8dd18ee",
  measurementId: "G-QEH29T4NN4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);