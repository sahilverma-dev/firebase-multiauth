import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loading from "../components/Loading.jsx";
import { auth, firestore } from "../firebase/config";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const signUpWithEmailPassword = async (email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(
        doc(firestore, `users/${user?.uid}`),
        {
          name: user?.displayName,
          authProvider: "Email and Password",
          email: user?.email,
          photoURL: user?.photoURL,
          phoneNumber: user?.phoneNumber,
          url: window.location.host,
          timestamp: serverTimestamp(),
        },
        {
          merge: true,
        }
      );
      return user;
    } catch (error) {
      console.log(error);
      if (
        error.message ===
        "Firebase: Error (auth/account-exists-with-different-credential)."
      )
        toast.error("This Email is already in use with authentication option.");
    }
  };
  const loginWithEmailPassword = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await setDoc(
        doc(firestore, `users/${user?.uid}`),
        {
          name: user?.displayName,
          authProvider: "Email and Password",
          email: user?.email,
          photoURL: user?.photoURL,
          phoneNumber: user?.phoneNumber,
          url: window.location.host,
          timestamp: serverTimestamp(),
        },
        {
          merge: true,
        }
      );
      return user;
    } catch (error) {
      console.log(error);
      if (
        error.message ===
        "Firebase: Error (auth/account-exists-with-different-credential)."
      )
        toast.error("This Email is already in use with authentication option.");
    }
  };
  const forgotPassword = async (email) => {
    try {
      const user = await sendPasswordResetEmail(auth, email);
      console.log(user);
      toast.success("Recovery mail send to your email.");
    } catch (error) {
      console.log(error);
      if (error.message === "Firebase: Error (auth/user-not-found).")
        toast.error("User not found with this email.");
    }
  };
  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      await setDoc(
        doc(firestore, `users/${user?.uid}`),
        {
          name: user?.displayName,
          authProvider: "Google",
          email: user?.email,
          photoURL: user?.photoURL,
          phoneNumber: user?.phoneNumber,
          url: window.location.host,
          timestamp: serverTimestamp(),
        },
        {
          merge: true,
        }
      );
    } catch (error) {
      console.log(error);
      if (
        error.message ===
        "Firebase: Error (auth/account-exists-with-different-credential)."
      )
        toast.error("This Email is already in use with authentication option.");
    }
  };
  const loginWithGithub = async () => {
    try {
      const provider = new GithubAuthProvider();
      const { user } = await signInWithPopup(auth, provider);

      await setDoc(
        doc(firestore, `users/${user?.uid}`),
        {
          name: user?.displayName,
          authProvider: "GitHub",
          email: user?.email,
          photoURL: user?.photoURL,
          phoneNumber: user?.phoneNumber,
          url: window.location.host,
          timestamp: serverTimestamp(),
        },
        {
          merge: true,
        }
      );
    } catch (error) {
      console.log(error);
      if (
        error.message ===
        "Firebase: Error (auth/account-exists-with-different-credential)."
      )
        toast.error("This Email is already in use with authentication option.");
    }
  };
  const loginWithFaceBook = async () => {
    try {
      const provider = new FacebookAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      await setDoc(
        doc(firestore, `users/${user?.uid}`),
        {
          name: user?.displayName,
          authProvider: "Facebook",
          email: user?.email,
          photoURL: user?.photoURL,
          phoneNumber: user?.phoneNumber,
          url: window.location.host,
          timestamp: serverTimestamp(),
        },
        {
          merge: true,
        }
      );
    } catch (error) {
      console.log(error);
      if (
        error.message ===
        "Firebase: Error (auth/account-exists-with-different-credential)."
      )
        toast.error("This Email is already in use with authentication option.");
    }
  };
  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{
        user,
        signUpWithEmailPassword,
        loginWithEmailPassword,
        forgotPassword,
        loginWithGoogle,
        loginWithGithub,
        loginWithFaceBook,
        logout,
      }}
    >
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context) {
    return context;
  } else {
    throw new Error("Something is wrong with auth context");
  }
};

export { AuthProvider, useAuth };
