


import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDe8DqVxXgRKtsdob28V8Js0Try5pXIeVg",
  authDomain: "the-social-good.firebaseapp.com",
  projectId: "the-social-good",
  storageBucket: "the-social-good.appspot.com",
  messagingSenderId: "351048528811",
  appId: "1:351048528811:web:d22a79a5f02684b8dd18ee",
  measurementId: "G-QEH29T4NN4"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// const analytics = getAnalytics(app);