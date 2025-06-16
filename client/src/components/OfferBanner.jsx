// src/components/OfferBanner.jsx

export default function OfferBanner({ title, subtitle, description, image }) {
  return (
    <div className="w-full bg-green-100 text-green-900 px-4 py-6 sm:py-8 md:py-10">
      <div className="max-w-6xl mx-auto flex flex-col-reverse sm:flex-row items-center justify-between gap-6">
        {/* Text Section */}
        <div className="flex-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            {title}
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold mt-2">{subtitle}</h2>
          <p className="text-base sm:text-lg mt-4 text-green-800">
            {description}
          </p>
        </div>

        {/* Image Section */}
        <div className="flex-1 w-full max-w-md sm:max-w-sm">
          <img
            src={image}
            alt="Offer Banner"
            // className="rounded-lg shadow-lg w-60 h-60 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
