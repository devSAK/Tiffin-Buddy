import { useState } from "react";
import { Menu, Close, ShoppingCart } from "@mui/icons-material";
import DarkModeToggle from "./DarkModeToggle";

export default function Header({
  onLoginClick,
  isAuthenticated,
  logout,
  user,
  setCartOpen,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  return (
    <header className="w-full bg-white dark:bg-gray-900 p-4 shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="h-12 w-12 object-cover rounded-lg"
        />

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex space-x-6 text-gray-800 dark:text-white font-medium">
          <button onClick={() => handleScroll("")}>Home</button>
          <button onClick={() => handleScroll("mealsCard")}>Meals</button>
          <button onClick={() => handleScroll("subscription")}>
            subscription
          </button>
          <button onClick={() => handleScroll("contactus")}>Contact Us</button>
        </nav>

        {/* Right Section */}
        <div className="hidden md:flex items-center space-x-4">
          <DarkModeToggle />
          {isAuthenticated ? (
            <>
              <span className="text-gray-800 dark:text-white">
                {user?.identifier}
              </span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={onLoginClick}
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
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

        {/* Hamburger Menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-800 dark:text-white"
        >
          {menuOpen ? <Close /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 px-6 py-4 bg-white dark:bg-gray-800 space-y-4">
          <nav className="flex flex-col space-y-3 text-gray-800 dark:text-white">
            <button onClick={() => handleScroll("")}>Home</button>
            <button onClick={() => handleScroll("mealsCard")}>Meals</button>
            <button onClick={() => handleScroll("subscription")}>
              Subscription
            </button>
            <button onClick={() => handleScroll("contactus")}>
              Contact Us
            </button>
          </nav>

          <div className="flex flex-col space-y-3 mt-3">
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
              onClick={() => {
                setCartOpen(true);
                setMenuOpen(false);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full w-fit self-start"
              title="View Cart"
            >
              <ShoppingCart fontSize="small" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
