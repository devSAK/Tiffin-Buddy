// utils/axiosInstance.js
import axios from "axios";

// const baseURL =
//   import.meta.env.MODE === "development"
//     ? "https://tiffin-buddy-backend.onrender.com/api"
//     : "http://localhost:5111/api";

const instance = axios.create({
  baseURL: "https://tiffin-buddy-backend.onrender.com/api",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("Axios error:", err?.response || err.message);
    return Promise.reject(err);
  }
);

export default instance;
