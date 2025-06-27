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
    // <Button
    //   className="text-xl p-2 text-yellow-500 dark:text-white hover:scale-110 transition"
    //   onClick={() => setIsDark(!isDark)}
    //   aria-label="Toggle Dark Mode"
    // >
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
    // </Button>
  );
}
