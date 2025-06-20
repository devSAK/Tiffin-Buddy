// src/axiosConfig.js
import axios from "axios";

// Create an axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5111", // change if needed
});

// Add a request interceptor
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
