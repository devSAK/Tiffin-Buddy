import axios from "axios";

// Set the base URL depending on your backend URL or proxy setup
const instance = axios.create({
  baseURL: "http://localhost:5111/api",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token to each request if present
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

// Optional: Global error logging
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Axios error:", error?.response || error.message);
    return Promise.reject(error);
  }
);

export default instance;
