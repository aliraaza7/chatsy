import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  signInWithPopup, 
  linkWithCredential,
  fetchSignInMethodsForEmail
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatsyreact.firebaseapp.com",
  projectId: "chatsyreact",
  storageBucket: "chatsyreact.appspot.com",
  messagingSenderId: "369608816156",
  appId: "1:369608816156:web:3ef6d943366254d01b91d9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);

// Function to request Notification permission and get FCM token
export const requestFCMPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      console.log("Notification permission granted.");
      const token = await getToken(messaging, {
        vapidKey: "BEpgOEB8HJjuofFcP5ozu7TvOBkQQvVvyEhdAnFAqtGuLZikQDG7S7LbmhXE4Sf-dDA51_pPBmLM5uZgabLSsFY",  // 🔹 Replace with your actual VAPID Key
      });
      console.log("FCM Token:", token);
      return token;
    } else {
      console.log("Notification permission denied.");
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
  }
};

// Listen for incoming messages when the app is in foreground
onMessage(messaging, (payload) => {
  console.log("Foreground push notification received:", payload);
});

// Google Authentication
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return await handleSocialAuth(result);
  } catch (error) {
    console.error("Google sign-in failed:", error.code, error.message);
    throw error;
  }
};

const facebookProvider = new FacebookAuthProvider();

export const signInWithFacebook = async () => {
  try {
    auth.languageCode = "en"; // Ensure popup appears in English

    // Try signing in with Facebook
    const result = await signInWithPopup(auth, facebookProvider);
    const user = result.user;

    // Check if user already exists in Firestore
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // New user: Save their data in Firestore
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
    if (error.code === "auth/account-exists-with-different-credential") {
      // Handle account linking
      return handleAccountExistsWithDifferentCredential(error);
    } else {
      console.error("Facebook sign-in failed", error);
      throw error;
    }
  }
};

// Function to handle account linking
const handleAccountExistsWithDifferentCredential = async (error) => {
  try {
    const email = error.customData.email;
    const credential = FacebookAuthProvider.credentialFromError(error);

    // Get the existing sign-in method(s) for the email
    const signInMethods = await fetchSignInMethodsForEmail(auth, email);

    if (signInMethods.includes("google.com")) {
      // If the user originally signed in with Google, ask them to sign in with Google again
      throw new Error("This email is linked with Google. Please sign in with Google.");
    }

    // If the user is already signed in, link the Facebook credential to the existing account
    if (auth.currentUser) {
      await linkWithCredential(auth.currentUser, credential);
      return auth.currentUser;
    } else {
      throw new Error("Please sign in using your original authentication method.");
    }
  } catch (err) {
    console.error("Error handling account linking:", err);
    throw err;
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
