import { CheckCircle, Cancel } from "@mui/icons-material";
import { useCart } from "../context/CartContext";

export default function SubscriptionCard({
  id,
  title,
  actualPrice,
  offerPrice,
  duration,
  features = [],
  excludedFeatures = [],
  whatsappCatId,
}) {
  // const { addToCart } = useCart();
  const whatsappLink = `https://wa.me/p/${whatsappCatId}`;

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 flex flex-col justify-between w-full max-w-sm mx-auto text-gray-800 dark:text-white
      hover:ring-2 hover:ring-blue-500 hover:shadow-lg hover:scale-105 transition duration-300 ease-in-out cursor-pointer"
    >
      <h3 className="text-2xl font-extrabold text-center mb-2">{title}</h3>

      {/* Price section */}
      <div className="text-center">
        <span className="text-sm line-through">₹</span>
        <span className="text-sm text-red-500 dark:text-red-400 line-through mr-2">
          {actualPrice}
        </span>
        <span className="text-xl font-semibold">₹</span>
        <span className="text-3xl font-bold text-green-600 dark:text-green-400">
          {offerPrice}
        </span>
        <span className="text-sm ml-1 text-gray-600 dark:text-gray-300">
          /{duration}
        </span>
      </div>

      <ul className="text-sm space-y-2 mb-4 mt-8">
        {features.map((feature, index) => (
          <li key={`included-${index}`} className="flex items-start space-x-2">
            <CheckCircle className="text-green-500 mt-0.5" fontSize="small" />
            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
          </li>
        ))}

        {excludedFeatures.map((feature, index) => (
          <li
            key={`excluded-${index}`}
            className="flex items-start space-x-2 line-through"
          >
            <Cancel className="text-red-500 mt-0.5" fontSize="small" />
            <span className="text-gray-700 dark:text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>

      <button className="mb-3 w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded-md transition">
        Meal Chart
      </button>
      {/* <button
        onClick={() => addToCart({ id, title, duration, price: offerPrice })}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition"
      >
        Choose Plan
      </button> */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-3 w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-center transition block"
      >
        Choose Plan
      </a>
    </div>
  );
}
