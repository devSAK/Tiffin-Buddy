import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
  );

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <IconButton
      aria-label="Toggle Dark Mode"
      onClick={() => setIsDark(!isDark)}
    >
      {isDark ? (
        <LightModeOutlinedIcon color="success" />
      ) : (
        <DarkModeOutlinedIcon />
      )}
    </IconButton>
  );
}
