import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import OfferBanner from "./OfferBanner";

const bannerOffers = [
  {
    title: "FLAT ₹75 OFF",
    subtitle: "on Weekly Subscription Plans!",
    description: "Healthy & Delicious Veg Tiffins Delivered Daily",
    image: "egg.png",
  },
  {
    title: "FLAT ₹900 OFF",
    subtitle: "on Monthly Subscription Plans!",
    description: "High protein meals now even more affordable.",
    image: "fish.png",
  },
  {
    title: "FREE Delivery",
    subtitle: "on Weekly & Monthly Subscription Plans!",
    description: "Perfect for protein lovers on a budget.",
    image: "fish.png",
  },
];

export default function OffersCarousel() {
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
          {bannerOffers.map((offer, idx) => (
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
