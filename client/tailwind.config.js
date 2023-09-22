/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily:{
      Noto:["Noto Sans", "sans-serif"],
      Ubuntu:['Ubuntu', "sans-serif"],
      Inter:['Inter', "sans-serif"]
    },
    colors:{
      buttonColor:"#336dc8",
      bodyColor:"#edf0f7ff",
      whie:"#fefeffff",
      black:"#000101ff",
      starColor:"#fed700"
    },
    
  },
  plugins: [],
}