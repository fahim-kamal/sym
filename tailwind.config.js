/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sym_red: "#FF4747",
        sym_blue: "#47E9FF",
        sym_green: "#47FFA7",
      },
    },
  },
  plugins: [],
};
