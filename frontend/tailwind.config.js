const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  important: "#root",
  theme: {
    extend: {},
  },
  plugins: [],
});
