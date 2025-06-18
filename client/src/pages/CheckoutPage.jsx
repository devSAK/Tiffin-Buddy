import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">
        Checkout
      </h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          Your cart is empty.
        </p>
      ) : (
        <>
          <ul className="space-y-3 mb-6">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between text-gray-800 dark:text-white"
              >
                <span>{item.duration}</span>
                <span>₹{item.price}</span>
              </li>
            ))}
          </ul>
          <hr className="mb-4" />
          <div className="flex justify-between font-semibold text-gray-900 dark:text-white">
            <span>Total</span>
            <span>₹{total}</span>
          </div>
          <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
            Simulate Payment (Coming Soon)
          </button>
        </>
      )}
    </div>
  );
}
