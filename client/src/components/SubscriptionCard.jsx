import { useEffect, useState } from "react";
import { CheckCircle, Cancel } from "@mui/icons-material";
// import { useCart } from "../context/CartContext";
import MealChartModal from "./MealChartModal";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function SubscriptionCard({
  id,
  title,
  actualPrice,
  offerPrice,
  duration,
  features = [],
  excludedFeatures = [],
  whatsappCatId,
  plan,
}) {
  // const { addToCart } = useCart();
  const { token, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showChart, setShowChart] = useState(false);

  const whatsappLink = `https://wa.me/p/${whatsappCatId}`;

  const handleSubscribe = async () => {
    if (!isAuthenticated) {
      alert("Please login to subscribe.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "/api/subscription",
        {
          planType: plan.title,
          price: plan.price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Subscribed successfully!");
    } catch (error) {
      console.error("Subscription failed:", error);
      alert("Failed to subscribe. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
            <li
              key={`included-${index}`}
              className="flex items-start space-x-2"
            >
              <CheckCircle className="text-green-500 mt-0.5" fontSize="small" />
              <span className="text-gray-700 dark:text-gray-300">
                {feature}
              </span>
            </li>
          ))}

          {excludedFeatures.map((feature, index) => (
            <li
              key={`excluded-${index}`}
              className="flex items-start space-x-2 line-through"
            >
              <Cancel className="text-red-500 mt-0.5" fontSize="small" />
              <span className="text-gray-700 dark:text-gray-300">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setShowChart(true)}
          className="mb-3 w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-400 text-white rounded-md transition cursor-pointer"
        >
          Meal Chart
        </button>
        <button
          onClick={handleSubscribe}
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition"
        >
          {loading ? "Subscribing..." : "Subscribe Now"}
        </button>
        {/* <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-3 w-full py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-center transition block"
        >
          Choose Plan
        </a> */}
      </div>
      {/* Modal */}
      <MealChartModal
        isOpen={showChart}
        onClose={() => setShowChart(false)}
        planType={plan.title}
      />
    </>
  );
}
