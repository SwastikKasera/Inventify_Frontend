module.exports = {
  darkMode: 'media',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {
      colors:{
        primary: "#DCFD52",
        secondary: "#DCFCB6",
        darkGreen: "#062A20",
        deeperGreen: "#09382A",
        lightGreen: "#8DA66F",
      }
    },
  },
  plugins: [
        require('flowbite/plugin')
    ],
}