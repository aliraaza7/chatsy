import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  signInWithPopup 
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatsyreact.firebaseapp.com",
  projectId: "chatsyreact",
  storageBucket: "chatsyreact.firebasestorage.app",
  messagingSenderId: "369608816156",
  appId: "1:369608816156:web:3ef6d943366254d01b91d9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Google Authentication
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if user exists in Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // If new user, store data
      await setDoc(userRef, {
        username: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        id: user.uid,
        blocked: [],
      });
    }

    return user;
  } catch (error) {
    console.error("Google sign-in failed", error);
    throw error;
  }
};

// Facebook Authentication
const facebookProvider = new FacebookAuthProvider();

export const signInWithFacebook = async () => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;

    // Check if user exists in Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // If new user, store data
      await setDoc(userRef, {
        username: user.displayName,
        email: user.email,
        avatar: user.photoURL,
        id: user.uid,
        blocked: [],
      });
    }

    return user;
  } catch (error) {
    console.error("Facebook sign-in failed", error);
    throw error;
  }
};
