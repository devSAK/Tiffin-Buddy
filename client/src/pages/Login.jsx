import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "../utils/axiosInstance";
import { Button, Link, Typography, CircularProgress } from "@mui/material";
import BackButton from "../components/BackButton";

export default function Login({ onLoginSuccess, onSwitch, isAdmin = false }) {
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
      const endpoint = isAdmin ? "/admin/login" : "/auth/login";
      const res = await axios.post(endpoint, {
        identifier: identifier.trim(),
        password,
      });

      login(res.data.token, res.data.user || res.data.admin); // support both roles

      if (onLoginSuccess) onLoginSuccess();
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          {isAdmin ? "Admin Login" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email or Phone
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
              className="w-full px-4 py-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            fullWidth
            size="large"
            variant="contained"
            type="submit"
            disabled={loading}
            startIcon={
              loading && <CircularProgress size={20} color="inherit" />
            }
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          <BackButton />
          {!isAdmin && (
            <p className="text-sm text-center text-gray-700 dark:text-gray-300 mt-2">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={onSwitch}
                className="text-blue-600 hover:underline"
              >
                Sign Up
              </button>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import {
//   Button,
//   TextField,
//   Typography,
//   Box,
//   Paper,
//   useTheme,
//   Link,
// } from "@mui/material";
// import { useAuth } from "../context/AuthContext";
// import axios from "../utils/axiosInstance";

// export default function Login({ onLoginSuccess, onSwitch }) {
//   const theme = useTheme();
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const { login } = useAuth();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post("/auth/login", { identifier, password });
//       login(res.data.token, res.data.user);
//       if (onLoginSuccess) onLoginSuccess();
//     } catch (err) {
//       console.error("Login failed:", err);
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         p: 4,
//         maxWidth: 400,
//         width: "100%",
//         margin: "auto",
//         backgroundColor: theme.palette.background.paper,
//       }}
//     >
//       <Typography
//         variant="h5"
//         component="h2"
//         align="center"
//         gutterBottom
//         color="text.primary"
//       >
//         Login
//       </Typography>

//       <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
//         <TextField
//           label="Email or Phone"
//           value={identifier}
//           onChange={(e) => setIdentifier(e.target.value)}
//           required
//           fullWidth
//           margin="normal"
//           variant="outlined"
//         />

//         <TextField
//           label="Password"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           fullWidth
//           margin="normal"
//           variant="outlined"
//         />

//         {error && (
//           <Typography variant="body2" color="error" sx={{ mt: 1 }}>
//             {error}
//           </Typography>
//         )}

//         <Button
//           type="submit"
//           variant="contained"
//           size="large"
//           fullWidth
//           sx={{ mt: 2 }}
//         >
//           Login
//         </Button>

//         <Typography
//           variant="body2"
//           align="center"
//           sx={{ mt: 2 }}
//           color="text.secondary"
//         >
//           Don’t have an account?{" "}
//           <Link
//             component="button"
//             variant="body2"
//             onClick={onSwitch}
//             sx={{ color: theme.palette.primary.main }}
//           >
//             Sign Up
//           </Link>
//         </Typography>
//       </Box>
//     </Paper>
//   );
// }
