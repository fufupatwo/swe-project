/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "Arial", "Helvetica", "sans-serif"],
      },
      colors: {
        utsablue: "#0c2340",
      },
    },
  },
  plugins: [],
};
