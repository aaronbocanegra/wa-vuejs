const autoprefixer = require('autoprefixer');
const tailwindcss = require('tailwindcss');
const postcssImport = require('postcss-import');
module.exports = {
  plugins: {
    'postcss-import': {},
    tailwindcss: {},
    'vue-cli-plugin-tailwind/purgecss': {},
    autoprefixer: {},
  }
}
