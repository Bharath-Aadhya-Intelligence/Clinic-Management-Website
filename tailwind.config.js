/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0D9488', // teal-600
          dark: '#0F766E', // teal-700
          light: '#2DD4BF', // teal-400
        },
        secondary: {
          DEFAULT: '#10B981', // emerald-500
          dark: '#059669', // emerald-600
          light: '#34D399', // emerald-400
        }
      }
    },
  },
  plugins: [],
}
