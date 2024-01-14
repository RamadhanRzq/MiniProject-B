// /** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "576px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
    },
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      backgroundImage: {
        home: "url('/images/image.jpg')",
      },
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
