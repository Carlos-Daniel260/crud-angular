/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html'],
  theme: {
    extend: {
      colors: {
        customBlue: '#3b82f6',
      },
      fontFamily: {
        customFont: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

