// import Header from "../components/Header";
import { meals } from "../data/meals";
import { plans } from "../data/plans";
import MealCard from "../components/MealCard";
import SubscriptionCard from "../components/SubscriptionCard";
import OffersCarousel from "../components/OffersCarousel";
import ContactUs from "../components/ContactUs";
import CustomerFeedback from "../components/CustomerFeedback";

export default function Dashboard({ setCartOpen }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="p-4 text-center text-xl space-y-8 dark:bg-black">
        <section>
          <OffersCarousel />
        </section>
        <section id="mealsCard" className="scroll-mt-20">
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
                setCartOpen={setCartOpen}
              />
            ))}
          </div>
        </section>

        <section id="subscription" className="scroll-mt-20">
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
        <section
          id="feedback"
          className="bg-gray-50 dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4 text-center">
              What Our Customers Say
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Real feedback from our happy customers
            </p>
            <CustomerFeedback />
          </div>
        </section>
        <section
          id="contactus"
          className="w-full bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold mb-4 text-center">
                Get in Touch
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300 text-lg">
                We'd love to hear from you. Fill out the form and we'll get back
                to you shortly.
              </p>
            </div>
            <ContactUs />
          </div>
        </section>
      </main>
    </div>
  );
}
