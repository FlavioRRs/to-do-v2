/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    backgroundSize: {
      '55px': '55px' 
    },
    screens: {
      '2xl': {'max': '1535px'},

      'xl': {'max': '1279px'},

      'lg': {'max': '1023px'},

      'xmd' : {'max' : '950px'},

      'md': {'max': '767px'},

      'sm': {'max': '639px'},

      's' : {'max' : '440px'}
    },
    extend: {
      backgroundImage: {
        'exit' : 'url("/src/assets/exit.svg")'
      },
      colors: {
        'black-1' : '#2f3032',
        'blue-1' : '#001449',
        'secondary' : '#490035',
        'input-bg' : '#00000010',
        'input-bg-hf' : '#00000020',
        'input-text' : '#2f3032',
        'input-placeholder' : '#2f303280'
      },
      borderRadius: {
        'input' : '10px',
        'button' : '10px'
      },
      boxShadow: {
        'google' : '0px 4px 4px 0px #00000040',
        'profile-pic' : '2px 4px 8px 0 rgba(0,0,0, 0.25)'
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}

