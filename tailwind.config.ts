import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617",
        card: "#0f172a",
        primary: {
          DEFAULT: "#2563eb",
          hover: "#1d4ed8",
        },
        glow: "#3b82f6",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      animation: {
        "glow-slow": "glow 8s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "gradient-shift": "gradientShift 10s ease infinite",
        "border-glow": "borderGlow 4s linear infinite",
      },
      keyframes: {
        glow: {
          "0%": { opacity: "0.4", transform: "scale(1) translate(0, 0)" },
          "50%": { opacity: "0.8", transform: "scale(1.1) translate(20px, -20px)" },
          "100%": { opacity: "0.4", transform: "scale(1) translate(0, 0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(59, 130, 246, 0.7)" },
        },
        gradientShift: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(37, 99, 235, 0.3)" },
          "50%": { borderColor: "rgba(59, 130, 246, 0.8)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
