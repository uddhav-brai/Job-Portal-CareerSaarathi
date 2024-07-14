/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: "#8A2BE2", // You can customize the shade of purple here
        },
        "royal-blue": "#4169e1", // Define "royal blue" color properly
      },
    },
  },
  plugins: [],
};
