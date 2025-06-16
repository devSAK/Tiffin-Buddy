import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import CartDrawer from "./CartDrawer";
import { ShoppingCart } from "@mui/icons-material";

export default function Header({ onLoginClick, isAuthenticated, onLogout }) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <header className="w-full bg-white dark:bg-gray-900 p-4 shadow flex justify-between items-center">
      <img
        src="/logo.png"
        alt="Logo"
        className="h-12 w-12 object-cover rounded-lg"
      />

      <div className="flex items-center space-x-4">
        <DarkModeToggle />

        {!isAuthenticated ? (
          <button
            onClick={onLoginClick}
            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          >
            Login
          </button>
        ) : (
          <button
            onClick={onLogout}
            className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
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

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
