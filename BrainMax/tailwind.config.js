/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', 
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'], // Include all source files
  theme: {
    extend: {},
  },
  plugins: [],
};

