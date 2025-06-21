import { useState } from "react";
import { TextField, Button, Typography, Paper } from "@mui/material";

export default function AdminLogin({ onLoginSuccess }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        onLoginSuccess();
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Login error. Please try again.");
    }
  };

  return (
    <Paper elevation={3} className="max-w-sm mx-auto p-6 mt-10">
      <Typography variant="h5" gutterBottom>
        Admin Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          variant="outlined"
          margin="normal"
          value={credentials.username}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          name="password"
          variant="outlined"
          margin="normal"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          color="primary"
          className="mt-4"
        >
          Login
        </Button>
      </form>
    </Paper>
  );
}
