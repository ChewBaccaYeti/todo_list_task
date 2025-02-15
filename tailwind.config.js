/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      borderWidth: {
        1: "0.25rem",
      },
    },
  },
  plugins: [],
  content: ["./src/**/*.{js,jsx,ts,tsx,html}", "./public/index.html"],
};
