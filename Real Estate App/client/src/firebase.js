// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-7b669.firebaseapp.com",
  projectId: "mern-estate-7b669",
  storageBucket: "mern-estate-7b669.appspot.com",
  messagingSenderId: "43427957792",
  appId: "1:43427957792:web:b8079f6e75f592dc438045",
  measurementId: "G-QMNHQBV9F7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
