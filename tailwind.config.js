/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Oswald", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        base: "#0D0E14",
        surface: "#15161F",
        card: "#1B1D29",
        border: "#2A2C3A",
        "border-strong": "#383B4E",
        brass: "#CC9A44",
        "brass-light": "#E8B968",
        "brass-dim": "#9C7530",
        petrol: "#3F82A0",
        "petrol-light": "#63AFC9",
        danger: "#DC5B52",
        "danger-light": "#F17F76",
        success: "#4CA35C",
        "success-light": "#74C685",
        warn: "#E0A83E",
      },
    },
  },
  plugins: [],
};
