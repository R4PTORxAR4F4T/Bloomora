import {
  signInWithPopup,
  signOut,
  User as FirebaseUser,
} from "firebase/auth";
import { User } from "../types/user";
import { auth, googleProvider } from "../lib/firebase";
import axios from "@/src/lib/axios";



class AuthService {
  async loginWithGoogle(): Promise<User> {
    const result = await signInWithPopup(auth, googleProvider);

    const idToken = await result.user.getIdToken();

    const response = await axios.post("/auth/login", {
      idToken,
    });

    return response.data.data;
  }

  async getProfile(): Promise<User> {
    const response = await axios.get("/auth/me");

    return response.data.data;
  }

  async logout() {
    await signOut(auth);
  }

  getCurrentFirebaseUser(): FirebaseUser | null {
    return auth.currentUser;
  }
}

export default new AuthService();