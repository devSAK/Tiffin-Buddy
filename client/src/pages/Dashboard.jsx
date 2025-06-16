import Header from "../components/Header";
import { meals } from "../data/meals";
import { plans } from "../data/plans";
import MealCard from "../components/MealCard";
import SubscriptionCard from "../components/SubscriptionCard";

export default function Dashboard({ onLoginClick, isAuthenticated, onLogout }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        onLoginClick={onLoginClick}
        isAuthenticated={isAuthenticated}
        onLogout={onLogout}
      />
      <main className="p-4 text-center text-xl space-y-8 dark:bg-black">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Our Meal Options
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {meals.map((meal) => (
              <MealCard
                key={meal.id}
                title={meal.title}
                image={meal.image}
                description={meal.description}
                value={meal.value}
                rating={meal.rating}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Subscription Plans
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <SubscriptionCard
                key={plan.id}
                title={plan.title}
                actualPrice={plan.actualPrice}
                offerPrice={plan.offerPrice}
                duration={plan.duration}
                features={plan.features}
                excludedFeatures={plan.excludedFeatures}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
