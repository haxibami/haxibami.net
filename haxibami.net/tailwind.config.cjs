/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-montserrat)",
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

      keyframes: {
        fadeup: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeup: "fadeup 0.5s",
      },
    },
  },
  plugins: [require("tailwindcss/nesting")],
};

module.exports = config;
