const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{html,njk}"],
  theme: {
    extend: {
      fontFamily: {
        player2: ['"Press Start 2P"', ...defaultTheme.fontFamily.mono],
      },
    },
    plugins: [],
  },
};
