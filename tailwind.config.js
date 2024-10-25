/* eslint-disable no-undef */
/* istanbul ignore file */
import  {colors} from './src/assets/styles/color'

module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Adjust paths according to your project
  ],
  // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors, // spread the colors object here
      },
      spacing: {
        '100': '100px',
        '50': '50px',
        '500':'500px'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
