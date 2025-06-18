import { Instagram, LinkedIn, WhatsApp, Facebook } from "@mui/icons-material";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-600 dark:text-gray-300 text-sm">
        <div>
          <img
            src="/logo.png"
            alt="Logo"
            className="h-12 w-12 object-cover rounded-lg mb-2"
          />
          <p>
            Tiffin Buddy offers freshly cooked, hygienic meals delivered to your
            doorstep. Choose from weekly or monthly subscriptions that fit your
            lifestyle.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
            Quick Links
          </h3>
          <ul className="space-y-1">
            <li>
              <a
                href="/privacy-policy"
                className="hover:text-yellow-500 hover:font-medium dark:hover:text-yellow-300"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="/terms-and-conditions"
                className="hover:text-yellow-500 hover:font-medium dark:hover:text-yellow-300"
              >
                Terms & Conditions
              </a>
            </li>
            <li>
              <a
                href="/legal-info"
                className="hover:text-yellow-500 hover:font-medium dark:hover:text-yellow-300"
              >
                Legal Info
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-yellow-500 hover:font-medium dark:hover:text-yellow-300"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
            Connect with Us
          </h3>
          <div className="flex space-x-4">
            <a
              href="https://wa.me/918343881788"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-500"
              title="WhatsApp"
            >
              <WhatsApp />
            </a>
            <a
              href="https://instagram.com/tiffin.buddy_2025"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500"
              title="Instagram"
            >
              <Instagram />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700"
              title="LinkedIn"
            >
              <LinkedIn />
            </a>
            <a
              href="https://facebook.com/683132018213914"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
              title="Facebook"
            >
              <Facebook />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t py-4 text-center text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} Tiffin Buddy. All rights reserved.
      </div>
    </footer>
  );
}
