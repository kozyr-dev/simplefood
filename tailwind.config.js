/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#46ba3c',
        secondary: '#ea5b21',
        darkBg: '#212121',
      }
    }
  },
  plugins: [],
}
