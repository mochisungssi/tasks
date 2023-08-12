/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-semi-75": "rgba(0, 0, 0, 0.75)",
      },
    },
  },
  plugins: [],
};
