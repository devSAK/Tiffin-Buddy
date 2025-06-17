import { useState } from "react";
import { Star, StarBorder } from "@mui/icons-material";
import { useCart } from "../context/CartContext";

export default function MealCard({
  id,
  title,
  image,
  description,
  value,
  rating,
  setCartOpen,
}) {
  const [hoveredRating, setHoveredRating] = useState(0);
  const { addToCart } = useCart();

  const renderStars = () => {
    const fullStars = hoveredRating || rating;
    return [...Array(5)].map((_, i) =>
      i < fullStars ? (
        <Star key={i} className="text-yellow-500" fontSize="small" />
      ) : (
        <StarBorder key={i} className="text-yellow-500" fontSize="small" />
      )
    );
  };

  const handleOrder = () => {
    addToCart({ id, title, price: value });
    if (setCartOpen) setCartOpen(true);
  };

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col justify-between w-full max-w-sm mx-auto text-gray-800 dark:text-white
      hover:ring-2 hover:ring-blue-500 hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
    >
      <div className="w-full overflow-hidden rounded-lg">
        <img
          src={image}
          alt={title}
          className="w-full h-auto object-cover rounded-lg"
          style={{ maxHeight: "240px" }}
        />
      </div>

      <div className="mt-4 flex-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          {description}
        </p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex space-x-1">{renderStars()}</div>
        <p className="text-sm text-gray-700 dark:text-gray-200">₹{value}</p>
      </div>

      <button
        onClick={handleOrder}
        className="mt-4 w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition"
      >
        Order Now
      </button>
    </div>
  );
}
