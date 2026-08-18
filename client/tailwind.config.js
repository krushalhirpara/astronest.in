/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "oklch(0.12 0.04 270)",
        foreground: "oklch(0.98 0.01 270)",
        primary: {
          DEFAULT: "oklch(0.65 0.25 300)",
          foreground: "oklch(0.99 0 0)",
        },
        secondary: {
          DEFAULT: "oklch(0.25 0.06 280)",
          foreground: "oklch(0.98 0.01 270)",
        },
        muted: {
          DEFAULT: "oklch(0.22 0.04 275)",
          foreground: "oklch(0.75 0.03 270)",
        },
        accent: {
          DEFAULT: "oklch(0.55 0.22 320)",
          foreground: "oklch(0.99 0 0)",
        },
        gold: {
          DEFAULT: "oklch(0.82 0.15 85)",
          foreground: "oklch(0.15 0.04 270)",
        },
        cosmic: {
          purple: "oklch(0.55 0.25 300)",
          indigo: "oklch(0.45 0.22 270)",
          pink: "oklch(0.7 0.25 350)",
        },
      },
      fontFamily: {
        sans: ["'Anek Devanagari'", "sans-serif"],
        heading: ["'Anek Devanagari'", "serif"],
        poppins: ["'Anek Devanagari'", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px 0 oklch(0.65 0.25 300 / 0.4)" },
          "50%": { boxShadow: "0 0 40px 8px oklch(0.65 0.25 300 / 0.6)" },
        },
        "cosmic-drift": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(2%, 1%) scale(1.02)" },
          "66%": { transform: "translate(-1%, 2%) scale(0.98)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
        "nebula-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1) translate(0, 0)" },
          "50%": { opacity: "0.7", transform: "scale(1.1) translate(2%, 2%)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        orbit: {
          from: { transform: "rotate(0deg) translateX(120px) rotate(0deg)" },
          to: { transform: "rotate(360deg) translateX(120px) rotate(-360deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        "spin-slow": "spin 30s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out forwards",
        shimmer: "shimmer 3s linear infinite",
        orbit: "orbit 20s linear infinite",
        "cosmic-drift": "cosmic-drift 20s ease-in-out infinite",
        "nebula-pulse": "nebula-pulse 15s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}
