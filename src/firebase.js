import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAq2ZR6QC0WqFV6EDZlhW4O1RijI9okEwk",
  authDomain: "notehub-6f6c1.firebaseapp.com",
  projectId: "notehub-6f6c1",
  storageBucket: "notehub-6f6c1.appspot.com",
  messagingSenderId: "336503659349",
  appId: "1:336503659349:web:8bf9db90377f5479a76ddc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
