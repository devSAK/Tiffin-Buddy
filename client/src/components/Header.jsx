import { useState } from "react";
import { Menu, Close, ShoppingCart } from "@mui/icons-material";
import { useAuth } from "../context/AuthContext";
import { Badge } from "@mui/material";
import DarkModeToggle from "./DarkModeToggle";

export default function Header({
  onLoginClick,
  onLogout,
  setCartOpen,
  cartItems,
  cartItemCount,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const [activeSection, setActiveSection] = useState("");
  // const isAdmin = user?.role === "admin";

  const totalItems = (cartItems || []).reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 p-4 shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between md:justify-start md:space-x-6">
        {/* Left - Logo */}
        <img
          src="/logo.png"
          alt="Logo"
          className="h-12 w-12 object-cover rounded-lg"
        />

        {/* Center - Dark Mode Toggle (mobile only) */}
        <div className="md:hidden flex-1 flex justify-center">
          <DarkModeToggle />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex space-x-6 font-medium text-gray-800 dark:text-white flex-1">
          {[
            { id: "home", label: "Home" },
            { id: "meals", label: "Meals" },
            { id: "subscription", label: "Subscription" },
            { id: "contactus", label: "Contact Us" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleScroll(id)}
              className={`relative pb-1 transition-all duration-400 hover:text-yellow-500 dark:hover:text-yellow-300 ${
                activeSection === id
                  ? "text-yellow-500 dark:text-yellow-300 font-medium"
                  : ""
              }`}
            >
              {label}
              {activeSection === id && (
                <span className="absolute left-0 bottom-0 h-[2px] w-full bg-yellow-500 dark:bg-yellow-300 rounded-full transition-all duration-300"></span>
              )}
            </button>
          ))}
        </nav>

        {/* Right Section (desktop only) */}
        <div className="hidden md:flex items-center space-x-4 ml-auto">
          <DarkModeToggle />
          {isAuthenticated ? (
            <>
              <span className="text-gray-800 dark:text-white text-sm">
                {user?.identifier}
              </span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
            >
              Login
            </button>
          )}
          <button
            onClick={() => setCartOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
            title="View Cart"
          >
            <ShoppingCart fontSize="medium" />
          </button>
        </div>

        {/* Mobile: Cart + Hamburger */}
        <div className="flex items-center space-x-3 md:hidden">
          <button
            onClick={() => setCartOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
            title="View Cart"
          >
            <Badge badgeContent={totalItems} color="error" showZero>
              <ShoppingCart fontSize="medium" />
            </Badge>
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-800 dark:text-white"
            title="Menu"
          >
            {menuOpen ? <Close /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 px-6 py-4 bg-white dark:bg-gray-800 space-y-4">
          <nav className="flex flex-col space-y-3 text-gray-800 dark:text-white">
            <button onClick={() => handleScroll("home")}>Home</button>
            <button onClick={() => handleScroll("meals")}>Meals</button>
            <button onClick={() => handleScroll("subscription")}>
              Subscription
            </button>
            <button onClick={() => handleScroll("contactus")}>
              Contact Us
            </button>
          </nav>

          <div className="flex flex-col space-y-3 mt-3">
            {isAuthenticated ? (
              <>
                <span className="text-gray-800 dark:text-white text-sm">
                  {user?.identifier}
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
