import { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import CheckoutPage from "./pages/CheckoutPage";

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
  };

  const handleShowLogin = () => {
    setShowLogin(true);
  };

  const handleHideLogin = () => {
    setShowLogin(false);
  };

  if (showLogin && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-white flex flex-col">
      <div className="flex-grow">
        <Dashboard
          onLoginClick={handleShowLogin}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
        />
      </div>
      <Footer />
      <WhatsAppButton />
      {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
    </div>
  );
}
