import { Link } from "react-router-dom";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-red-50 dark:bg-gray-900 text-center px-6">
      <h1 className="text-4xl font-bold text-red-600 dark:text-red-400 mb-4">
        403 - Unauthorized
      </h1>
      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        You don’t have permission to view this page.
      </p>
      <Link
        to="/"
        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
