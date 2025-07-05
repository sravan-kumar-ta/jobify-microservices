/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
   theme: {
      extend: {
         margin: {
            "70p": "70%",
            "25p": "25%",
         },
      },
   },
   plugins: [],
};
