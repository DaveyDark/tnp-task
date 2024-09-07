/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6482AD",
        secondary: "#7FA1C3",
        tertiary: "#0000ff",
        surface: "#E2DAD6",
        white: "#F5EDED",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
