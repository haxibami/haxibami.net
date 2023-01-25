/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        "var(--font-rubik)",
        "Helvetica Neue",
        "Helvetica",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "NotoColorEmoji",
        "Noto Color Emoji",
        "Segoe UI Symbol",
        "Android Emoji",
        "EmojiSymbols",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Noto Sans",
        "sans-serif",
      ],
      redoctober: ["var(--font-redoctober)", "sans-serif"],
    },

    extend: {},
  },
  plugins: [],
};

module.exports = config;
