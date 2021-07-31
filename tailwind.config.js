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
     screens: {
      'sm': {'max':'640px'},
      'sl': '640px',
      'md': '768px',
      'lg': {'max':'1024px'},
      'xl': '1280px',
      '2xl': '1536px',
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
