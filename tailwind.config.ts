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
        moss: {
          50: "#f4f6f4",
          100: "#e8ede8",
          200: "#d1dbd1",
          300: "#b0c3b1",
          400: "#8aa58c",
          500: "#6a8a6c",
          600: "#527056",
          700: "#435a45",
          800: "#374a39",
          900: "#2d3d2f",
          950: "#1a241b",
        },
        sage: {
          50: "#f6f7f6",
          100: "#e3e7e3",
          200: "#c7d0c8",
          300: "#a3b1a5",
          400: "#7d8e80",
          500: "#627465",
          600: "#4d5c50",
          700: "#3f4a41",
          800: "#353d36",
          900: "#2d332e",
        },
        cream: {
          50: "#fafaf8",
          100: "#f5f5f0",
          200: "#e8e8dd",
          300: "#d9d9c8",
        },
        surface: "#ffffff",
        surfaceMuted: "#f0f2ee",
        border: "#d1dbd1",
        foreground: {
          DEFAULT: "#2d3d2f",
          muted: "#627465",
        },
        accent: {
          DEFAULT: "#6a8a6c",
          soft: "#8aa58c",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui"],
        display: ["var(--font-space-grotesk)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-ibm-plex-mono)", "ui-monospace", "SFMono-Regular"],
      },
      boxShadow: {
        glow: "0 20px 60px rgba(106, 138, 108, 0.25)",
        card: "0 4px 20px rgba(45, 61, 47, 0.08)",
        hover: "0 12px 40px rgba(106, 138, 108, 0.20)",
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      backgroundImage: {
        'moss-gradient': 'linear-gradient(135deg, #6a8a6c 0%, #435a45 100%)',
        'sage-gradient': 'linear-gradient(135deg, #a3b1a5 0%, #627465 100%)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },
      gap: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
    },
  },
  plugins: [],
};

export default config;
