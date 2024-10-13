/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Your Custom Font', 'ui-sans-serif', 'system-ui'],
        // You can define other font families here, e.g., serif, mono
      },
    },
  },
  plugins: [],
}