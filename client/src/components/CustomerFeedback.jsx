const testimonials = [
  {
    name: "Anjali Das",
    role: "Working Professional",
    feedback:
      "Tiffin Buddy has made my daily meals hassle-free! I love the variety and the quality. Highly recommend!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "Ravi Singh",
    role: "College Student",
    feedback:
      "Affordable, healthy, and tasty! I’ve tried multiple services, but Tiffin Buddy stands out.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
  },
  {
    name: "Shamima Sultana",
    role: "Freelancer",
    feedback:
      "Customer support is amazing and meals are delivered right on time. My favorite is their egg curry meal!",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
];

export default function CustomerFeedback() {
  return (
    <div className="mt-12 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition duration-300"
        >
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                {testimonial.name}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {testimonial.role}
              </p>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">
            “{testimonial.feedback}”
          </p>
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill={i < testimonial.rating ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.985a1 1 0 00.95.69h4.21c.969 0 1.371 1.24.588 1.81l-3.407 2.475a1 1 0 00-.364 1.118l1.287 3.985c.3.921-.755 1.688-1.54 1.118l-3.408-2.475a1 1 0 00-1.176 0l-3.407 2.475c-.785.57-1.84-.197-1.54-1.118l1.287-3.985a1 1 0 00-.364-1.118L2.223 9.412c-.783-.57-.38-1.81.588-1.81h4.21a1 1 0 00.951-.69l1.286-3.985z"
                />
              </svg>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
