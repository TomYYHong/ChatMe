import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';
//  const apiKey1 = import.meta.env.REACT_APP_FIREBASE_API_KEY;
// const apiKey2 = process.env.REACT_APP_FIREBASE_API_KEY;
// console.log("apiKey1: ",apiKey1,"apikey2: ",apiKey2);
const firebaseConfig = {
    //  apiKey: apiKey1,
    // apiKey: process.env.FIREBASE_API_KEY,
    apiKey:"AIzaSyAHajRA9tkkbncJDfrWwS81hRxDNsHBNT8",
    authDomain: "chatme-af595.firebaseapp.com",
    projectId: "chatme-af595",
    storageBucket: "chatme-af595.appspot.com",
    messagingSenderId: "759633202",
    appId: "1:759633202:web:38b8939eba8198adee332b",
    measurementId: "G-DWNJW5C41H"
  };

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
auth.useDeviceLanguage();