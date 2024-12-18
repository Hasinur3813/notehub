import React, { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // sign in with google

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    setCurrentUser(user);
  };

  // sign up functionality

  const signup = async (userName, email, password) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, {
      displayName: userName,
    });

    setCurrentUser(user);
    await user.reload();
  };

  //   login functionality

  const login = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  //   logout
  const logout = () => {
    signOut(auth);
    window.location.reload();
  };

  const resetPassword = async (email) => {
    await sendPasswordResetEmail(auth, email);
  };

  // update profile

  const value = {
    currentUser,
    setCurrentUser,
    signup,
    login,
    logout,
    signInWithGoogle,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
