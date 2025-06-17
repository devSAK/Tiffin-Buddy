// src/layout/MainLayout.jsx

import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import CartDrawer from "../components/CartDrawer";

export default function MainLayout({
  children,
  onLoginClick,
  isAuthenticated,
  onLogout,
  cartOpen,
  setCartOpen,
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-white">
      <Header
        onLoginClick={onLoginClick}
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
        setCartOpen={setCartOpen}
      />
      <main className="flex-grow">{children}</main>
      <Footer />
      <WhatsAppButton />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
