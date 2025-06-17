import { useState } from "react";
import TextField from "@mui/material/TextField";

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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("❌ Something went wrong. Try again later.");
      }
    } catch (error) {
      console.error(error);
      setStatus("⚠️ Failed to send. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Contact Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 space-y-5"
      >
        <TextField
          size="small"
          name="name"
          label="Name"
          variant="outlined"
          required
          fullWidth
          value={formData.name}
          onChange={handleChange}
          className="bg-white dark:bg-gray-700 rounded"
          InputLabelProps={{
            className: "dark:text-gray-300",
          }}
          InputProps={{
            style: {
              color: "white",
            },
          }}
        />

        <TextField
          size="small"
          name="email"
          label="Email"
          type="email"
          variant="outlined"
          required
          fullWidth
          value={formData.email}
          onChange={handleChange}
          className="bg-white dark:bg-gray-700 rounded"
          InputLabelProps={{
            className: "dark:text-gray-300",
          }}
          InputProps={{
            style: {
              color: "white",
            },
          }}
        />

        <TextField
          size="small"
          name="subject"
          label="Subject"
          variant="outlined"
          required
          fullWidth
          value={formData.subject}
          onChange={handleChange}
          className="bg-white dark:bg-gray-700 rounded"
          InputLabelProps={{
            className: "dark:text-gray-300",
          }}
          InputProps={{
            style: {
              color: "white",
            },
          }}
        />

        <TextField
          size="small"
          name="message"
          label="Message"
          variant="outlined"
          required
          multiline
          rows={5}
          fullWidth
          value={formData.message}
          onChange={handleChange}
          className="bg-white dark:bg-gray-700 rounded"
          InputLabelProps={{
            className: "dark:text-gray-300",
          }}
          InputProps={{
            style: {
              color: "white",
            },
          }}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-[1.02] font-thin"
        >
          Send Message
        </button>

        {status && (
          <p className="text-sm text-center mt-4 text-blue-600 dark:text-blue-300">
            {status}
          </p>
        )}
      </form>

      {/* Contact Details & Map */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Our Location
        </h3>
        {/* <div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            <strong>Tiffin Buddy</strong>
            <br />
            Dhankal Bazar (Hatiara),
            <br />
            Kolkata, West Bengal 700059, India
          </p>
        </div> */}

        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
          <iframe
            title="Tiffin Buddy Map"
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
  );
}
