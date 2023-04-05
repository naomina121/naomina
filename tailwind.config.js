/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xl: { max: '1320px' },
      lg: { max: '1024px' },
      md: { max: '768px' },
      sm: { max: '320px' },
    },
  },
  plugins: [],
};
