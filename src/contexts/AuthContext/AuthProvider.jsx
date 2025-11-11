import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // detect user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // sign in with googlepopup
  const provider = new GoogleAuthProvider();
  const googleSignIn = () => {
    return signInWithPopup(auth, provider);
  };

  // create user with email and passwrod
  const createUserWithEmailPass = (email, password) => {
    return createUserWithEmailAndPassword(email, password);
  };

  // sign in with email and passwrod
  const signInEmailPass = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const authData = { googleSignIn, user, loading, createUserWithEmailPass,signInEmailPass };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
