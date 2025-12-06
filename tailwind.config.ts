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
      fontFamily: {
        // McKinsey-style: Serif for headings, clean sans for body
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        heading: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-roboto-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        // McKinsey-style professional navy palette
        navy: {
          50: "#f0f4f8",
          100: "#d9e2ec",
          200: "#bcccdc",
          300: "#9fb3c8",
          400: "#829ab1",
          500: "#627d98",
          600: "#486581",
          700: "#334e68",
          800: "#243b53",
          900: "#0f1d32",
          950: "#0a1628",
        },
        // Premium slate colors
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        // McKinsey-inspired deep blue accent
        mckinsey: {
          blue: "#051c2c",
          navy: "#0a3161",
          light: "#2251ff",
          muted: "#5a7184",
        },
        // Corporate blue accent
        corporate: {
          50: "#e6f3ff",
          100: "#b3d9ff",
          200: "#80bfff",
          300: "#4da6ff",
          400: "#1a8cff",
          500: "#0073e6",
          600: "#005cb3",
          700: "#004680",
          800: "#002f4d",
          900: "#00192b",
        },
        // Neutralized moss/sage colors (mapped to slate)
        moss: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        sage: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        cream: {
          50: "#fafbfc",
          100: "#f8fafc",
          200: "#f1f5f9",
          300: "#e2e8f0",
        },
        surface: "#ffffff",
        surfaceMuted: "#f8fafc",
        border: "#e2e8f0",
        foreground: {
          DEFAULT: "#0a1628",
          muted: "#64748b",
          light: "#f1f5f9",
        },
        accent: {
          DEFAULT: "#3b82f6",
          soft: "#60a5fa",
          electric: "#2563eb",
        },
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
      backgroundImage: {
        'stripe-gradient': 'linear-gradient(135deg, #635bff 0%, #0073e6 50%, #00c4c4 100%)',
        'stripe-gradient-dark': 'linear-gradient(135deg, #0a1929 0%, #102a43 50%, #1e293b 100%)',
        'hero-mesh': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 91, 255, 0.3), transparent)',
        'glow-conic': 'conic-gradient(from 180deg at 50% 50%, #635bff 0deg, #0073e6 90deg, #00c4c4 180deg, #0073e6 270deg, #635bff 360deg)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        'stripe': '0 4px 6px -1px rgba(99, 91, 255, 0.1), 0 2px 4px -1px rgba(99, 91, 255, 0.06)',
        'stripe-lg': '0 10px 15px -3px rgba(99, 91, 255, 0.15), 0 4px 6px -2px rgba(99, 91, 255, 0.1)',
        'stripe-xl': '0 20px 25px -5px rgba(99, 91, 255, 0.2), 0 10px 10px -5px rgba(99, 91, 255, 0.1)',
        'corporate': '0 4px 14px 0 rgba(0, 115, 230, 0.15)',
        'glow': '0 0 40px rgba(99, 91, 255, 0.3)',
        'glow-sm': '0 0 20px rgba(99, 91, 255, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.8s ease-out forwards',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
