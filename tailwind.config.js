module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        indigo: {
          200: '#F0F7FF',
          300: '#ffffff'
        }
      }
    },
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif'],
      'arima': ['Arima Madurai', 'sans-serif']
    },
  },
  plugins: [],
}
