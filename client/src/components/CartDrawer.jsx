import { useCart } from "../context/CartContext";

export default function CartDrawer({ isOpen, onClose }) {
  const { cartItems, removeFromCart, clearCart } = useCart();

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-lg transition-transform z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-bold dark:text-white">Your Cart</h2>
        <button onClick={onClose}>&times;</button>
      </div>

      <div className="p-4 space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Cart is empty.
          </p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-gray-800 dark:text-white">
                  {item.duration}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ₹{item.price}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="p-4 border-t">
          <button
            onClick={clearCart}
            className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md py-2 mb-2"
          >
            Clear Cart
          </button>
          <a
            href="/checkout"
            className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md py-2"
          >
            Proceed to Checkout
          </a>
        </div>
      )}
    </div>
  );
}
