import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import OfferBanner from "./OfferBanner";
import { offers } from "../data/offers";

// const bannerOffers = [
//   {
//     title: "FLAT ₹75 OFF",
//     subtitle: "on Weekly Subscription Plans!",
//     description: "Healthy & Delicious Meals Delivered Daily",
//     image: "soya.png",
//   },
//   {
//     title: "FLAT ₹650 OFF",
//     subtitle: "on Monthly Subscription Plans!",
//     description: "High protein meals now even more affordable.",
//     image: "prime.png",
//   },
//   {
//     title: "FREE Delivery",
//     subtitle: "on Weekly & Monthly Subscription Plans!",
//     description: "Perfect for protein lovers on a budget.",
//     image: "fish.png",
//   },
//   {
//     title: "Special TRIAL PLAN for only ₹200",
//     subtitle: "1 Soya, 1 Egg, 1 Chiken and 1 Fish Meal",
//     description: "Test the Best, can be served.",
//     image: "chicken.png",
//   },
// ];

export default function OffersCarousel({
  title,
  subtitle,
  description,
  image,
}) {
  return (
    <div className="w-full max-w-6xl mx-auto mt-4 px-4">
      <div className="w-full max-w-6xl mx-auto mt-4 px-4">
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
          interval={4000}
          className="rounded-xl shadow-lg overflow-hidden"
        >
          {offers.map((offer, idx) => (
            <div key={idx}>
              <OfferBanner
                title={offer.title}
                subtitle={offer.subtitle}
                description={offer.description}
                image={offer.image}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
