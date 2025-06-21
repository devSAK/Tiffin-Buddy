import { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Switch,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Pause, PlayArrow } from "@mui/icons-material";

export default function AdminDashboard() {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    try {
      const res = await fetch("/api/admin/subscriptions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setSubscriptions(data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch subscriptions", err);
      setLoading(false);
    }
  };

  const togglePause = async (id, currentStatus) => {
    try {
      await fetch(`/api/admin/subscriptions/${id}/toggle-pause`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSubscriptions();
    } catch (err) {
      console.error("Toggle pause failed", err);
    }
  };

  const toggleDay = async (id, day) => {
    try {
      await fetch(`/api/admin/subscriptions/${id}/toggle-day/${day}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchSubscriptions();
    } catch (err) {
      console.error("Toggle day failed", err);
    }
  };

  if (loading)
    return (
      <div className="text-center mt-10">
        <CircularProgress />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Typography variant="h4" gutterBottom>
        Subscription Orders
      </Typography>

      {subscriptions.length === 0 ? (
        <Typography>No subscriptions found.</Typography>
      ) : (
        subscriptions.map((sub) => (
          <Paper key={sub._id} className="p-4 mb-4 shadow-md">
            <div className="flex justify-between items-center">
              <div>
                <Typography variant="h6">{sub.userId?.identifier}</Typography>
                <Typography variant="body2">
                  Status:{" "}
                  <span
                    className={sub.isPaused ? "text-red-500" : "text-green-600"}
                  >
                    {sub.isPaused ? "Paused" : "Active"}
                  </span>
                </Typography>
              </div>

              <IconButton onClick={() => togglePause(sub._id, sub.isPaused)}>
                {sub.isPaused ? (
                  <PlayArrow className="text-green-600" />
                ) : (
                  <Pause className="text-red-500" />
                )}
              </IconButton>
            </div>

            <div className="mt-3">
              <Typography variant="subtitle1" className="mb-2">
                Meal Days:
              </Typography>
              <div className="grid grid-cols-3 gap-3">
                {Object.entries(sub.mealDays || {}).map(([day, value]) => (
                  <div key={day} className="flex items-center justify-between">
                    <span className="capitalize text-gray-800 dark:text-white">
                      {day}
                    </span>
                    <Switch
                      checked={value}
                      onChange={() => toggleDay(sub._id, day)}
                      color="primary"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Paper>
        ))
      )}
    </div>
  );
}
