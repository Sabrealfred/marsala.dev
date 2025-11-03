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
        background: "#ffffff",
        surface: "#fafafa",
        surfaceMuted: "#f5f5f5",
        border: "#e5e5e5",
        accent: {
          DEFAULT: "#000000",
          light: "#171717",
        },
        foreground: {
          DEFAULT: "#000000",
          muted: "#525252",
        },
        marsala: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        glow: "0 24px 60px rgba(0, 0, 0, 0.15)",
        card: "0 4px 20px rgba(0, 0, 0, 0.06)",
        hover: "0 8px 30px rgba(0, 0, 0, 0.12)",
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
