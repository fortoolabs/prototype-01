/** @type {import('tailwindcss').Config} */

const { white } = require('tailwindcss/colors')

//@vidbina let us only abstract custom tailwind properties here that is reused
//will work on abstracting everything later
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          // main: '#1a1c1f',
          // slate-50,
          main: '#f8fafc',
          // hover: '#282A2F',
          hover: '#f1f5f9',
        },
        'c-blue': {
          main: '#157EFB',
          hover: '#046eec',
        },
      },
      //width for aside section used on logo div also
      width: {
        97: '25rem',
      },
      fontFamily: {
        robotoSerif: ['"Roboto Serif"', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('flowbite/plugin')],
}
