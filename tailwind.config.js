// tailwind.config.js
module.exports = {
  darkMode: "class", // Enable dark mode
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        primary: "#F5F7FA",
        secondary: "#FFFFFF",
        accent: {
          1: "#4A90E2",
          2: "#F76C6C",
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
  plugins: [require("daisyui")],
};
