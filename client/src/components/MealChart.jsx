export default function MealChart({ plan }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const primeDinner = plan === "monthly" ? "Chicken Curry" : "Mixed Veg";

  return (
    <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
      <h4 className="font-semibold text-md mb-2">
        Meal Chart (Lunch & Dinner)
      </h4>
      <div className="grid grid-cols-7 gap-2 text-center text-xs sm:text-sm">
        {days.map((day, idx) => (
          <div
            key={idx}
            className="border rounded-md bg-white dark:bg-gray-800 p-2 shadow-sm"
          >
            <div className="font-bold">{day}</div>
            <div className="text-green-600">Lunch: Veg Meal</div>
            <div className="text-blue-600">
              Dinner:{" "}
              {plan === "monthly" && idx === 3
                ? primeDinner
                : "Dal + Egg Curry"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
