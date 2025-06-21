import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

/**
 * Generic Private Route with optional role restriction
 * @param {ReactNode} children - Component to render
 * @param {Array} allowedRoles - Optional array of allowed roles e.g. ['admin']
 */
export default function PrivateRoute({ children, allowedRoles = [] }) {
  const token =
    localStorage.getItem("userToken") || localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const userRole = decoded.role || "user"; // default role fallback

    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return children;
  } catch (err) {
    console.error("Invalid token", err);
    return <Navigate to="/" replace />;
  }
}
