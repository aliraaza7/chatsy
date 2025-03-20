// import { initializeApp } from "firebase/app";
// import { 
//   getAuth, 
//   GoogleAuthProvider, 
//   FacebookAuthProvider, 
//   signInWithPopup 
// } from "firebase/auth";
// import { 
//   getFirestore, 
//   doc, 
//   setDoc, 
//   getDoc 
// } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: "chatsyreact.firebaseapp.com",
//   projectId: "chatsyreact",
//   storageBucket: "chatsyreact.firebasestorage.app",
//   messagingSenderId: "369608816156",
//   appId: "1:369608816156:web:3ef6d943366254d01b91d9",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app);

// // Google Authentication
// const googleProvider = new GoogleAuthProvider();

// export const signInWithGoogle = async () => {
//   try {
//     const result = await signInWithPopup(auth, googleProvider);
//     const user = result.user;

//     // Check if user exists in Firestore
//     const userRef = doc(db, "users", user.uid);
//     const userSnap = await getDoc(userRef);

//     if (!userSnap.exists()) {
//       // If new user, store data
//       await setDoc(userRef, {
//         username: user.displayName,
//         email: user.email,
//         avatar: user.photoURL,
//         id: user.uid,
//         blocked: [],
//       });
//     }

//     return user;
//   } catch (error) {
//     console.error("Google sign-in failed", error);
//     throw error;
//   }
// };

// // Facebook Authentication
// const facebookProvider = new FacebookAuthProvider();

// export const signInWithFacebook = async () => {
//   try {
//     auth.languageCode = 'en'; // Force English language for Facebook popup
//     const result = await signInWithPopup(auth, facebookProvider);
//     const user = result.user;

//     const userRef = doc(db, "users", user.uid);
//     const userSnap = await getDoc(userRef);

//     if (!userSnap.exists()) {
//       await setDoc(userRef, {
//         username: user.displayName,
//         email: user.email,
//         avatar: user.photoURL,
//         id: user.uid,
//         blocked: [],
//       });
//     }

//     return user;
//   } catch (error) {
//     console.error("Facebook sign-in failed", error);
//     throw error;
//   }
// };

import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  signInWithPopup, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword 
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

// Sign in with Email & Password
export const loginWithEmail = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign up with Email & Password
export const registerWithEmail = async (username, email, password, avatarUrl) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;

  // Save user data to Firestore
  await setDoc(doc(db, "users", user.uid), {
    username,
    email,
    avatar: avatarUrl,
    id: user.uid,
    blocked: [],
  });

  await setDoc(doc(db, "userchats", user.uid), {
    chats: [],
  });

  return user;
};

// Google Authentication
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return await handleSocialAuth(result);
  } catch (error) {
    console.error("Google sign-in failed", error);
    throw error;
  }
};

// Facebook Authentication
const facebookProvider = new FacebookAuthProvider();

export const signInWithFacebook = async () => {
  try {
    auth.languageCode = 'en';
    const result = await signInWithPopup(auth, facebookProvider);
    return await handleSocialAuth(result);
  } catch (error) {
    console.error("Facebook sign-in failed", error);
    throw error;
  }
};

// Handle storing user data after social sign-in
const handleSocialAuth = async (result) => {
  const user = result.user;
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      username: user.displayName,
      email: user.email,
      avatar: user.photoURL,
      id: user.uid,
      blocked: [],
    });
  }

  return user;
};
