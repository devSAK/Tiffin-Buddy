import { useState } from "react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      // TODO: Replace with your API endpoint
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("Something went wrong. Try again later.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Failed to send. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="w-full bg-gray-100 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Name
              </label>
              <input
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Subject
              </label>
              <input
                name="subject"
                type="text"
                required
                value={formData.subject}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-400"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Message
              </label>
              <textarea
                name="message"
                required
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring focus:ring-blue-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition font-semibold"
            >
              Send Message
            </button>

            {status && (
              <p className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">
                {status}
              </p>
            )}
          </form>

          {/* Location Info + Map */}
          <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
              Our Location
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Tiffin Buddy
              <br />
              Dhankal Bazar (Hatiara),
              <br />
              Kolkata, West Bengal 700059
              <br />
              India
            </p>

            <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700">
              <iframe
                title="Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3353.977133574339!2d88.44208370458655!3d22.617245139273233!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89fd5b73778e5%3A0x796d415cbe84ec0d!2sDhankal%20Bazar%20(Hatiara)!5e0!3m2!1sen!2sin!4v1750148927423!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
