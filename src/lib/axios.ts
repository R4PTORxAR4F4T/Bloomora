import axios from "axios";
import { auth } from "./firebase";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    const token = await user.getIdToken();

    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;