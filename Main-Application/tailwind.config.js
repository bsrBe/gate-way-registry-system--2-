/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        mainThemeColor:"#0c2a4c",
        accentColor:"#dcc380",
        primaryColor:"#164f8e"
      }
    },
  },
  plugins: [],
}