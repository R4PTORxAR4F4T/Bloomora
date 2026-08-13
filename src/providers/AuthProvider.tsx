"use client";

import { ReactNode, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth, googleProvider } from "../lib/firebase";
import axios from "../lib/axios";

import { AuthContext } from "../context/AuthContext";
import { User } from "../types/user";

interface Props {
  children: ReactNode;
}

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  async function fetchProfile() {
    try {
      const response = await axios.get("/auth/me");

      setUser(response.data.data);

      try {
        const localCart = localStorage.getItem("cart");
        if (localCart) {
          const items = JSON.parse(localCart);
          if (items.length > 0) {
            await axios.post("/cart/sync", items);
            localStorage.removeItem("cart");
          }
        }
      } catch (error) {
        console.error("Cart sync failed", error);
      }
    } catch (error) {
      console.error(error);
      setUser(null);
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (!firebaseUser) {
          setUser(null);
          setLoading(false);
          return;
        }

        const idToken = await firebaseUser.getIdToken();

        console.log(idToken);

        await axios.post("/auth/login", {
          idToken,
        });

        await fetchProfile();
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  async function login() {
    try {
      setLoading(true);

      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
    try {
      await signOut(auth);

      setUser(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function refreshUser() {
    await fetchProfile();
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}