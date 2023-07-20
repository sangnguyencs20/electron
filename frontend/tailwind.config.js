const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  important: "#root",
  theme: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
});
