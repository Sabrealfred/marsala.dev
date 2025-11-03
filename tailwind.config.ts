import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./styles/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f6f7fb",
        surface: "#ffffff",
        surfaceMuted: "#eceef6",
        border: "#e2e4ea",
        accent: {
          DEFAULT: "#5b67f4",
          soft: "#9b69ff",
        },
        foreground: {
          DEFAULT: "#0f172a",
          muted: "#475569",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 24px 60px rgba(91, 103, 244, 0.25)",
        card: "0 18px 40px rgba(15, 23, 42, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
