import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CheckoutPage from "./pages/CheckoutPage";
import AdminDashboard from "./pages/AdminDashboard";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import UnauthorizedPage from "./pages/UnauthorizedPage";
import MainLayout from "./layout/MainLayout";

import PrivateRoute from "./routes/PrivateRoute";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  const handleShowLogin = () => setShowLogin(true);
  const handleHideLogin = () => setShowLogin(false);

  if (showLogin && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
        {isSignup ? (
          <Signup
            onSwitch={() => setIsSignup(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        ) : (
          <Login
            onSwitch={() => setIsSignup(true)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        {/* MAIN CONSUMER ROUTE */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Dashboard
                onLoginClick={handleShowLogin}
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
              />
            </MainLayout>
          }
        />
        {/* CHECKOUT PAGE */}
        <Route
          path="/checkout"
          element={
            <MainLayout>
              <CheckoutPage />
            </MainLayout>
          }
        />
        {/* LEGAL PAGES */}
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
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

        {/* Admin Routes */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          {/* ADMIN DASHBOARD */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}
