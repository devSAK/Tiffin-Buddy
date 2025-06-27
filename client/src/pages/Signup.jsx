import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/axiosInstance";
import { Button, CircularProgress } from "@mui/material";
import BackButton from "../components/BackButton";

export default function Signup({ onLoginSuccess, onSwitch, isAdmin = false }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isAdmin ? "/admin/signup" : "/auth/signup";
      const loginEndpoint = isAdmin ? "/admin/login" : "/auth/login";

      // Step 1: Sign up
      await axios.post(endpoint, {
        email: identifier.trim(), // for admin
        identifier: identifier.trim(), // for user
        password,
      });

      // Step 2: Login
      const loginRes = await axios.post(loginEndpoint, {
        email: identifier.trim(), // for admin
        identifier: identifier.trim(), // for user
        password,
      });

      // Step 3: Store token + user
      login(loginRes.data.token, loginRes.data.user || loginRes.data.admin);

      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      console.error("Signup failed:", err);
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          {isAdmin ? "Admin Sign Up" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              {isAdmin ? "Email" : "Email or Phone"}
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="success"
            type="submit"
            disabled={loading}
            startIcon={
              loading && <CircularProgress size={20} color="inherit" />
            }
          >
            {loading ? "Signing up..." : "Sign Up"}
          </Button>
          <BackButton />
          {!isAdmin && (
            <p className="text-sm text-center text-gray-700 dark:text-gray-300 mt-2">
              Already have an account?{" "}
              <button
                type="button"
                onClick={onSwitch}
                className="text-blue-600 hover:underline"
              >
                Login
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
