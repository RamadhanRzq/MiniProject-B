// /** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        hijau: "#38761d",
        muda: "#6aa84f",
      },
      fontFamily: {
        Jost: "'Jost', sans-serif",
      },
    },
  },
  plugins: [],
};
