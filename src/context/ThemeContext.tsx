"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem("fixar_theme") as Theme | null;
      if (savedTheme === "dark" || savedTheme === "light") {
        setThemeState(savedTheme);
        applyTheme(savedTheme);
      } else {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme: Theme = prefersDark ? "dark" : "light";
        setThemeState(initialTheme);
        applyTheme(initialTheme);
      }
    } catch {
      // Storage unavailable fallback
    }
    setMounted(true);
  }, []);

  const applyTheme = (nextTheme: Theme) => {
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (nextTheme === "dark") {
        root.classList.add("dark");
        root.setAttribute("data-theme", "dark");
      } else {
        root.classList.remove("dark");
        root.setAttribute("data-theme", "light");
      }
    }
  };

  const setTheme = (nextTheme: Theme) => {
    setThemeState(nextTheme);
    applyTheme(nextTheme);
    try {
      localStorage.setItem("fixar_theme", nextTheme);
      document.cookie = `fixar_theme=${nextTheme}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {}
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
