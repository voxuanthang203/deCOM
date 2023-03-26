/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "#3E3BDC",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
