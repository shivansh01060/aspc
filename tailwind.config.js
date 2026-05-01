/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: "#FAF7F0", dark: "#F0EAD6" },
        turmeric: { DEFAULT: "#E8A020", light: "#F5C842", dark: "#C47A0A" },
        spice: { DEFAULT: "#C45E1A", dark: "#A04010" },
        earth: { DEFAULT: "#5C3D1E", dark: "#2C1A0E" },
        warm: { DEFAULT: "#FFF9F0" },
      },
      fontFamily: {
        heading: ['"Playfair Display"', "Georgia", "serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      backgroundImage: {
        grain: "url('/noise.svg')",
      },
    },
  },
  plugins: [],
};
