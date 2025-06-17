import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import CheckoutPage from "./pages/CheckoutPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import MainLayout from "./layout/MainLayout";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  if (showLogin && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
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
        <Route
          path="/"
          element={
            <MainLayout
              onLoginClick={handleShowLogin}
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
              cartOpen={cartOpen}
              setCartOpen={setCartOpen}
            >
              <Dashboard
                onLoginClick={handleShowLogin}
                isAuthenticated={isAuthenticated}
                onLogout={handleLogout}
                setCartOpen={setCartOpen}
              />
            </MainLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <MainLayout
              onLoginClick={handleShowLogin}
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
            >
              <CheckoutPage />
            </MainLayout>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <MainLayout
              onLoginClick={handleShowLogin}
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
            >
              <PrivacyPolicy />
            </MainLayout>
          }
        />
        <Route
          path="/terms-and-conditions"
          element={
            <MainLayout
              onLoginClick={handleShowLogin}
              isAuthenticated={isAuthenticated}
              onLogout={handleLogout}
            >
              <TermsAndConditions />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}
