import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatsyreact.firebaseapp.com",
  projectId: "chatsyreact",
  storageBucket: "chatsyreact.firebasestorage.app",
  messagingSenderId: "369608816156",
  appId: "1:369608816156:web:3ef6d943366254d01b91d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()
export const storage = getStorage();