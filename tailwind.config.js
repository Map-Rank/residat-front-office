/* eslint-disable no-undef */

import  {colors} from './src/assets/styles/color'

module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colors, // spread the colors object here
      },
      spacing: {
        '100': '100px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
