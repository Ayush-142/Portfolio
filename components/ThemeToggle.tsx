"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const PAPER_BY_THEME: Record<Theme, string> = {
  light: "#edeef0",
  dark: "#101317",
};

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document
    .getElementById("theme-color-meta")
    ?.setAttribute("content", PAPER_BY_THEME[theme]);
}

function SunIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="3" />
      <path d="M8 1v1.5M8 13.5V15M15 8h-1.5M2.5 8H1M12.6 3.4l-1.06 1.06M4.46 11.54l-1.06 1.06M12.6 12.6l-1.06-1.06M4.46 4.46 3.4 3.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M13.5 9.5A6 6 0 1 1 6.5 2.5a5 5 0 0 0 7 7Z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "dark" ? "dark" : "light");

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem("theme")) return;
      const next: Theme = e.matches ? "dark" : "light";
      applyTheme(next);
      setTheme(next);
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyTheme(next);
    localStorage.setItem("theme", next);
    setTheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={theme === "dark"}
      className="text-ink transition-colors duration-[120ms] ease hover:text-accept motion-reduce:transition-none"
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
