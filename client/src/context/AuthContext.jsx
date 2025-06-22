// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "../../axiosConfig";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("token") || "");

//   useEffect(() => {
//     if (token) {
//       axios
//         .get("/api/auth/me", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((res) => setUser(res.data.user))
//         .catch(() => logout());
//     }
//   }, [token]);

//   const login = (token, user) => {
//     localStorage.setItem("token", token);
//     setToken(token);
//     setUser(user);
//   };

//   const logout = () => {
//     localStorage.removeItem("token");
//     setToken("");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, token, login, logout, isAuthenticated: !!user }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

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

  // Optional: Refresh from localStorage on mount
  useEffect(() => {
    if (token && !user) {
      try {
        const decoded = jwtDecode(token);
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
