import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0A192F",
          dark: "#0B1B3D",
          blue: "#2563EB",
          "blue-dark": "#1D4ED8",
          "blue-light": "#3B82F6",
          orange: "#FF6B00",
          "orange-hover": "#EA580C",
          "orange-light": "#FFF7ED",
          surface: "#F8FAFC",
          muted: "#64748B",
          border: "#E2E8F0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        arabic: ["var(--font-cairo)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px -5px rgba(10, 25, 47, 0.08)",
        "card-hover": "0 20px 35px -5px rgba(10, 25, 47, 0.14)",
        glow: "0 0 25px rgba(37, 99, 235, 0.25)",
        "orange-glow": "0 0 25px rgba(255, 107, 0, 0.3)",
      },
      animation: {
        "pulse-subtle": "pulseSubtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.92", transform: "scale(1.03)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
