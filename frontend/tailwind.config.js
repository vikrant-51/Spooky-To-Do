/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        creepster: ["Creepster", "cursive"],
      },
      colors: {
        "purple-900": "#0d001a",
        "purple-800": "#1a0026",
        "orange-400": "#FFA500",
        "green-400": "#00FF00",
        "black": "#000000",
        "red-500": "#FF4500",
      },
    },
  },
  plugins: [],
};
