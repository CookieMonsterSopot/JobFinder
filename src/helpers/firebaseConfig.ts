import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBVcqZ8-2cjbdaO6Z4IHj1SBNnKCzTz4Ok",
  authDomain: "jobfinder-app-d8a27.firebaseapp.com",
  projectId: "jobfinder-app-d8a27",
  storageBucket: "jobfinder-app-d8a27.appspot.com",
  messagingSenderId: "459258221227",
  appId: "1:459258221227:web:1a2dd8857d7859b5719dee",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
