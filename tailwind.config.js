const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        sym_red: "#FF4747",
        sym_blue: "#47E9FF",
        sym_green: "#47FFA7",
        sym_bg_gray: "#F5F5F5",
      },
    },
  },
  plugins: [
    require("daisyui"),
    plugin(function ({ addBase, theme }) {
      addBase({
        h2: {
          fontSize: 24,
          fontWeight: "bold",
        },
        h3: {
          fontSize: 18,
          fontWeight: "bold",
        },
      });
    }),
  ],
  daisyui: {
    themes: ["light"],
    base: "false",
  },
};
