import { createContext, useContext, useEffect, useState } from "react";
// import axios from "../utils/axiosInstance";
import * as jwtDecode from "jwt-decode"; // ESM-compatible import

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    try {
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
      localStorage.removeItem("user"); // Clean up corrupted data
      return null;
    }
  });

  // const instance = axios.create({
  //   baseURL: "http://localhost:5111", // ✅ Match your backend port
  //   withCredentials: false,
  // });

  const login = (token, userData) => {
    setToken(token);
    setUser(userData);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const isAdmin = user?.role === "admin";

  useEffect(() => {
    if (token && !user) {
      try {
        const decoded = jwtDecode.jwtDecode(token); // <- Use this format
        setUser({ identifier: decoded.identifier, role: decoded.role });
      } catch (err) {
        logout();
      }
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{ token, user, login, logout, isAdmin, isAuthenticated: !!token }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
