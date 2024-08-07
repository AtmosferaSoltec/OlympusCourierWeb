/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      screens: {
        'sm': '300px',
      },
      colors: {
        colorP1: '#047CC4',
        colorCard: '#eeeeee',
        colorGrey: '#808080',
        p: {
          '50': '#f0f8ff',
          '100': '#e0f1fe',
          '200': '#bbe4fc',
          '300': '#7ecffb',
          '400': '#3ab5f6',
          '500': '#109ce7',
          '600': '#047cc4',
          '700': '#05649f',
          '800': '#085584',
          '900': '#0d476d',
          '950': '#092d48',
        },
        'p1': '#047CC4',
        'p2': '#54adff',
        'p3': '#54adff',
        'p4': '#54adff',
        's1': '#3f4143',
        's2': '#3f4143',
        's3': '#3f4143',
        's4': '#3f4143',
        't': '#1c2134',
        'textos': '#808080',
        't2': '#989eb6',
        'box': '#f5f7fc',
        'fondo': '#f1f1f1'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

