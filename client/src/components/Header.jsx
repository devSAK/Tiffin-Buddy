import { useState } from "react";
import DarkModeToggle from "./DarkModeToggle";
import CartDrawer from "./CartDrawer";

export default function Header({ onLoginClick, isAuthenticated, onLogout }) {
  const [cartOpen, setCartOpen] = useState(false);
  return (
    <header className="w-full bg-white dark:bg-gray-900 p-4 shadow flex justify-between items-center">
      <h1 className="text-xl font-bold text-gray-800 dark:text-white">
        Tiffin Service
      </h1>
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
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded ml-4"
      >
        View Cart
      </button>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
