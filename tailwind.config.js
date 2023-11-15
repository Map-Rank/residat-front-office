/* eslint-disable no-undef */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing:{
        '100':'100px',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};