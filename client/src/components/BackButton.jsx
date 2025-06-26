import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";

export default function BackButton({ label = "Go Back" }) {
  const navigate = useNavigate();
  //   const location = useLocation();
  //   const showBack = location.key !== "default"; // Only show if there's history
  //   if (!showBack) return null;
  return (
    <Button
      size="medium"
      variant="contained"
      color="success"
      startIcon={<ArrowBackIcon />}
      onClick={() => navigate(-1)}
      sx={{ mb: 2 }}
    >
      {label}
    </Button>
  );
}
