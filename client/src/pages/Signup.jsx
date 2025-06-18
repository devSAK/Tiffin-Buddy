import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { signup } from "../api/auth"; // assuming you have a wrapper OR replace with axios directly
import axios from "axios";

export default function Signup({ onSwitch, onLoginSuccess }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    const emailOrPhoneRegex = /^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$|^[0-9]{10}$/;
    const passwordFormatRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;

    if (!identifier.trim()) {
      newErrors.identifier = "Email or phone is required.";
    } else if (!emailOrPhoneRegex.test(identifier.trim())) {
      newErrors.identifier = "Invalid email or phone number format.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else if (!passwordFormatRegex.test(password)) {
      newErrors.password =
        "Password must include at least 1 letter, 1 number, and 1 special character.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5111/api/auth/signup", {
        identifier,
        password,
      });

      alert("Signup successful!");
      onSwitch(); // Switch to login after successful signup
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-900 p-8 rounded-xl shadow-md text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      <form onSubmit={handleSignup} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">
            Email or Phone
          </label>
          <input
            type="text"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            placeholder="Enter email or phone"
            required
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.identifier
                ? "border-red-500 focus:ring-red-400"
                : "focus:ring-blue-500"
            }`}
          />
          {errors.identifier && (
            <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "focus:ring-blue-500"
              }`}
              required
            />
            <Tooltip
              title={showPassword ? "Hide password" : "Show password"}
              placement="right"
              arrow
            >
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-600 dark:text-gray-300"
              >
                {showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </button>
            </Tooltip>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200 disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p className="text-sm mt-4 text-center">
        Already have an account?{" "}
        <button
          onClick={onSwitch}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Login
        </button>
      </p>
    </div>
  );
}
