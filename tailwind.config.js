const plugin = require("tailwindcss/plugin");

const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-mukta)"],
      },
      colors: {
        sym_red: "#FF4747",
        sym_blue: "#47E9FF",
        sym_green: "#47FFA7",
        sym_bg_gray: "#F5F5F5",
        "hover-1": colors.gray[50],
        "hover-2": colors.gray[200],
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
