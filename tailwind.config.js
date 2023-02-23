/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {
      enabled: true,
      content: ['./src/**/*.{html,ts}']
  },
  mode: 'jit',
  darkMode: 'class', // or 'media' or 'class',
  theme: {
      extend: {
          fontFamily: {
              sans: ["nunito", "sans-serif"],
          },
          letterSpacing: {
              normal: '.01em'
          },
          colors: {
              'custom-green-500': '#24B43F',
              'custom-green-400': '#3DCD58',
              'custom-green-300': '#5BE66F',
              'custom-bg-gray-500': '#202427',
              'custom-bg-gray-400': '#2b2e33',
              'custom-bg-gray-300': '#303236',
              'custom-bg-gray-200': '#46494f',
              'custom-bg-gray-100': '#51555c',
              'custom-bg-gray-light-400': '#f3f2f2',
              'custom-bg-gray-light-500': '#ececec',
              'custom-bg-gray-light-600': '#e4e4e4',
              'custom-text-gray-500': '#494B50',
              'custom-text-gray-400': '#5C6466',
              'custom-text-gray-300': '#c5c5c5',
              'custom-text-gray-200': '#cbcbcb',
              'custom-text-gray-100': '#f8f8f8',
              'custom-text-gray-light-200':'#fafafa',
              'custom-text-gray-light-300':'#727272',
              'custom-text-gray-light-400':'#454545',
              'custom-red-400': '#FF3E24',
              'custom-blue-400': '#42B4E6',
              'custom-orange-400': '#FFA924',
              'custom-yellow-400': '#FEDC38',
              'custom-bg-black-200':'#424242',
              'custom-bg-black-300':'#303030',
          },
          fontSize: {
              xs2: '0.65rem'
          }
      }
  },
  variants: {
      extend: {},
  },
}
