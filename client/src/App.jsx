import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CheckoutPage from "./pages/CheckoutPage";
import AdminDashboard from "./pages/AdminDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import LegalInfo from "./pages/LegalInfo";

import MainLayout from "./layout/MainLayout";
import PrivateRoute from "./routes/PrivateRoute";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { login, logout, isAuthenticated, isAdmin } = useAuth();

  // const [isSignup, setIsSignup] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleLoginSuccess = (token, userData) => {
    login(token, userData);
  };

  const handleLogout = () => {
    logout();
  };

  // const handleShowLogin = () => setShowLogin(true);
  // const handleHideLogin = () => setShowLogin(false);

  // if (showLogin && !isAuthenticated) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
  //       {isSignup ? (
  //         <Signup
  //           onSwitch={() => setIsSignup(false)}
  //           onLoginSuccess={handleLoginSuccess}
  //         />
  //       ) : (
  //         <Login
  //           onSwitch={() => setIsSignup(true)}
  //           onLoginSuccess={handleLoginSuccess}
  //         />
  //       )}
  //     </div>
  //   );
  // }

  return (
    <Routes>
      {/* 🔓 Public Route */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* 🔐 Auth Routes */}
      <Route
        path="/login"
        element={
          // <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <Login
            onSwitch={() => (window.location.href = "/signup")}
            onLoginSuccess={handleLoginSuccess}
          />
          // </div>
        }
      />
      <Route
        path="/signup"
        element={
          // <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
          <Signup
            onSwitch={() => (window.location.href = "/login")}
            onLoginSuccess={handleLoginSuccess}
          />
          // </div>
        }
      />

      {/* 🏠 Main Landing Route */}
      <Route
        path="/"
        element={
          <MainLayout
            onLoginClick={() => (window.location.href = "/login")}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
            cartItems={cartItems}
          >
            <Dashboard setCartOpen={setCartOpen} />
          </MainLayout>
        }
      />

      {/* 🧾 Checkout */}
      <Route
        path="/checkout"
        element={
          <MainLayout
            onLoginClick={() => (window.location.href = "/login")}
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
            cartOpen={cartOpen}
            setCartOpen={setCartOpen}
            cartItems={cartItems}
          >
            <CheckoutPage />
          </MainLayout>
        }
      />

      {/* 📜 Legal */}
      <Route
        path="/privacy-policy"
        element={
          <MainLayout>
            <PrivacyPolicy />
          </MainLayout>
        }
      />
      <Route
        path="/terms-and-conditions"
        element={
          <MainLayout>
            <TermsAndConditions />
          </MainLayout>
        }
      />
      <Route
        path="/legal-info"
        element={
          <MainLayout>
            <LegalInfo />
          </MainLayout>
        }
      />

      {/* 🔐 Admin-only Protected Route */}
      <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      {/* 🧭 Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
