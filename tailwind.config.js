const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{html,njk}"],
  theme: {
    extend: {
      fontFamily: {
        player2: ["PressStart2P", ...defaultTheme.fontFamily.mono],
      },
    },
    plugins: [require("daisyui")],
  },
};
