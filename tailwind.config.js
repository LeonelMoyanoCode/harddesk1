/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
      fontFamily: {
        playFair: ['Playfair Display'],
        openSans: ['Open Sans'],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"),],
};