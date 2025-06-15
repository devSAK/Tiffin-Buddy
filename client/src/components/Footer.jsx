export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow mt-10">
      <div className="max-w-6xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-gray-600 dark:text-gray-300 text-sm">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()} Tiffin Service. All rights reserved.
        </p>
        <div className="mt-2 sm:mt-0 flex gap-4">
          <a href="#" className="hover:text-blue-500">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-blue-500">
            Terms
          </a>
          <a href="#" className="hover:text-blue-500">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
