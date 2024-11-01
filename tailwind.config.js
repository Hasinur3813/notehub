import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#f5f9fd",
        secondary: "#FFFFFF",
        accent: {
          1: "#26b3ce",
          2: "#1e91a7",
        },
        dark: {
          primary: "#1A202C",
          secondary: "#2D3748",
        },
        text: {
          light: "#1A202C",
          dark: "#E2E8F0",
        },
        muted: "#E2E8F0",
      },
    },
  },
  plugins: [daisyui],
};
