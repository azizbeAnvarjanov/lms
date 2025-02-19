// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBC39k0GVssvBfKjk8XWzHmS5ChleZdPoY",
  authDomain: "lmsplatform-34183.firebaseapp.com",
  projectId: "lmsplatform-34183",
  storageBucket: "lmsplatform-34183.appspot.com",
  messagingSenderId: "546025729505",
  appId: "1:546025729505:web:ee7f9fbd5da85c8fc1b6a0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const provider = new GoogleAuthProvider();
 