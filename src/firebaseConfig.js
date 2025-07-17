// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// ✅ Your actual Firebase config values
const firebaseConfig = {
  apiKey: "AIzaSyB5hZiVxKxpEjHYyi4j7VMy44RC7QiM560",
  authDomain: "temple-tour-planner.firebaseapp.com",
  projectId: "temple-tour-planner",
  storageBucket: "temple-tour-planner.appspot.com",
  messagingSenderId: "233650450361",
  appId: "1:233650450361:web:dac9bc20632a78b79c5068",
};

const app = initializeApp(firebaseConfig);

// ✅ Export both Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
