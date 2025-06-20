import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { login as loginApi } from "../api/auth"; // ✅ Renamed import
import { useAuth } from "../context/AuthContext";

export default function Login({ onSwitch }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const { login: loginContext } = useAuth(); // ✅ Renamed from context

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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await loginApi(identifier, password); // ✅ Call API
      loginContext(res.data.token, res.data.user); // ✅ Set context
      alert("Login success!");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Identifier Field */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
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
                ? "border-red-500 dark:border-red-400"
                : "focus:ring-blue-500 dark:focus:ring-blue-300"
            }`}
          />
          {errors.identifier && (
            <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 dark:border-red-400"
                  : "focus:ring-blue-500 dark:focus:ring-blue-300"
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
                className="absolute inset-y-0 right-3 flex items-center text-gray-600"
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
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>

      <p className="text-sm mt-4 text-center">
        Don't have an account?{" "}
        <button onClick={onSwitch} className="text-blue-600 hover:underline">
          Sign up
        </button>
      </p>
    </div>
  );
}
