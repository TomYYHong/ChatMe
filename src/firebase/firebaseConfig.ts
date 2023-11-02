import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';
// const apiKey = import.meta.env.FIREBASE_API_KEY;
const apiKey = process.env.FIREBASE_API_KEY;
const firebaseConfig = {
     apiKey: apiKey,
    // apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "chatme-af595.firebaseapp.com",
    projectId: "chatme-af595",
    storageBucket: "chatme-af595.appspot.com",
    messagingSenderId: "759633202",
    appId: "1:759633202:web:38b8939eba8198adee332b",
    measurementId: "G-DWNJW5C41H"
  };

  console.log("apiKey: ",apiKey);

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.useDeviceLanguage();