// import { useState } from "react";
// import "./login.css";
// import { toast } from "react-toastify";
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   GoogleAuthProvider, signInWithPopup
// } from "firebase/auth";
// import { auth, db, signInWithFacebook, signInWithGoogle } from "../../lib/firebase";
// import { doc, setDoc } from "firebase/firestore";
// import upload from "../../lib/upload";

// function Login() {
//   const [avatar, setAvatar] = useState({
//     file: null,
//     url: "",
//   });

//   const [loading, setLoading] = useState(false);

//   function handleAvatar(e) {
//     if (e.target.files[0]) {
//       setAvatar({
//         file: e.target.files[0],
//         url: URL.createObjectURL(e.target.files[0]),
//       });
//     }
//   }

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     const formData = new FormData(e.target);
//     const { email, password } = Object.fromEntries(formData);

//     try {
//         await signInWithEmailAndPassword(auth, email, password)
//     } catch (err) {
//       console.log(err);
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const formData = new FormData(e.target);
//     const { username, email, password } = Object.fromEntries(formData);

//     try {
//       const res = await createUserWithEmailAndPassword(auth, email, password);

//       // Upload the image to Cloudinary
//       const imgUrl = avatar.file ? await upload(avatar.file) : "";

//       // Save user data to Firestore
//       await setDoc(doc(db, "users", res.user.uid), {
//         username,
//         email,
//         avatar: imgUrl,
//         id: res.user.uid,
//         blocked: [],
//       });

//       await setDoc(doc(db, "userchats", res.user.uid), {
//         chats: [],
//       });

//       toast.success("Account created! You can login now.");
//     } catch (err) {
//       console.log(err);
//       toast.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleGoogleSignUp = async (e) => {
//     e.preventDefault(); // Prevent form submission
//     try {
//       const user = await signInWithGoogle();
//       toast.success(`Welcome ${user.displayName}`);
//     } catch (err) {
//       toast.error("Google signup failed");
//     }
//   };
  
//   const handleFacebookLogin = async (e) => {
//     e.preventDefault(); // Prevent form submission
//     try {
//       const user = await signInWithFacebook();
//       toast.success(`Welcome ${user.displayName}`);
//     } catch (err) {
//       toast.error("Facebook login failed");
//     }
//   };

//   return (
//     <div className="login">
//       <div className="item">
//         <h2>Welcome back</h2>
//         <form onSubmit={handleLogin}>
//           <input type="text" placeholder="email" name="email" />
//           <input type="password" placeholder="password" name="password" />
//           <button disabled={loading}>
//             {loading ? "Loading..." : "Sign In"}
//           </button>
//         </form>
//       </div>
//       <div className="seperator"></div>
//       <div className="item">
//         <h2>Create an Account</h2>
//         <form onSubmit={handleRegister}>
//           <label htmlFor="file">
//             <img src={avatar.url || "./avatar.png"} alt="" />
//             Upload an Image
//           </label>
//           <input
//             type="file"
//             id="file"
//             style={{ display: "none" }}
//             onChange={handleAvatar}
//           />
//           <input type="text" placeholder="username" name="username" />
//           <input type="text" placeholder="email" name="email" />
//           <input type="password" placeholder="password" name="password" />
//           <button disabled={loading}>
//             {loading ? "Loading..." : "Sign Up"}
//           </button>
//           <button onClick={handleGoogleSignUp} style={{backgroundColor: "green"}}>Sign Up with Google</button>
//           <button onClick={handleFacebookLogin} style={{backgroundColor: "blue"}}>Sign in with Facebook</button>


//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;
import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth, db, signInWithFacebook, signInWithGoogle } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";

function Login() {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const [loading, setLoading] = useState(false);

  function handleAvatar(e) {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
    } catch (err) {
      console.error("Login error:", err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Upload the image to Cloudinary
      const imgUrl = avatar.file ? await upload(avatar.file) : "";

      // Save user data to Firestore
      await setDoc(doc(db, "users", res.user.uid), {
        username,
        email,
        avatar: imgUrl,
        id: res.user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Account created! You can login now.");
    } catch (err) {
      console.error("Registration error:", err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const user = await signInWithGoogle();
      toast.success(`Welcome ${user.displayName}`);
    } catch (err) {
      console.error("Google signup failed:", err.message);
      toast.error(`Google signup failed: ${err.message}`);
    }
  };
  
  const handleFacebookLogin = async () => {
    try {
      const user = await signInWithFacebook();
      toast.success(`Welcome ${user.displayName}`);
    } catch (err) {
      console.error("Facebook login failed:", err.message);
      toast.error(`Facebook login failed: ${err.message}`);
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button disabled={loading}>
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
      </div>
      <div className="seperator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            Upload an Image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="username" name="username" />
          <input type="text" placeholder="email" name="email" />
          <input type="password" placeholder="password" name="password" />
          <button disabled={loading}>
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <button onClick={handleGoogleSignUp} style={{backgroundColor: "green"}}>
            Sign Up with Google
          </button>
          <button onClick={handleFacebookLogin} style={{backgroundColor: "blue"}}>
            Sign in with Facebook
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
