import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton() {
  const phoneNumber = "918343881788"; // Replace with your WhatsApp number
  const message = "Hello, I'm interested in your tiffin service!";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-50"
      aria-label="Contact us on WhatsApp"
    >
      <div className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition duration-300">
        <FaWhatsapp size={28} />
      </div>
    </a>
  );
}
