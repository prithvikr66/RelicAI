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
      Ubuntu:['Ubuntu', "sans-serif"]
    },
    colors:{
      buttonColor:"#b319feff",
      bodyColor:"#edf0f7ff",
      whie:"#fefeffff",
      black:"#000101ff"
    },
    
  },
  plugins: [],
}