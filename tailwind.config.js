module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    minHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
      "8": "8rem",
      "10": '10rem',
      "screen":'100vh',
      '100': '26rem'
     },
    extend: {
      height: {
        '100':'26rem',
        '80vh':'80vh'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true
}
