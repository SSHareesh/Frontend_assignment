/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#1976d2',
          dark: '#90caf9',
        },
        background: {
          light: '#ffffff',
          dark: '#121212',
          paper: {
            light: '#ffffff',
            dark: '#1e1e1e',
          },
        },
      },
    },
  },
  plugins: [],
}