/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
  theme: {
    extend: {
      fontFamily: {
        main: ['"Source Sans 3"', "sans-serif"],
      },
      backgroundImage: {
        rain: "url('/src/images/rain.webp')",
      },
    },
  },
  plugins: [],
};

