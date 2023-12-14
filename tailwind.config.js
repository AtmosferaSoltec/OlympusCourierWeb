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
        'box': '#f5f7fc'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

