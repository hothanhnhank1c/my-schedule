/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'system-ui', 'sans-serif'],
        nunito: ['"Nunito"', 'sans-serif'],
        comfortaa: ['"Comfortaa"', 'cursive'],
        mali: ['"Mali"', 'cursive'],
        caveat: ['"Caveat"', 'cursive'],
        quicksand: ['"Quicksand"', 'sans-serif'],
        baloo: ['"Baloo 2"', 'cursive'],
        pacifico: ['"Pacifico"', 'cursive'],
        patrick: ['"Patrick Hand"', 'cursive'],
      },
    },
  },
  plugins: [],
}