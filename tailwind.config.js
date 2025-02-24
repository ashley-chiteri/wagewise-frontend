module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#1E40AF', // Custom primary color
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'], // Custom font
        },
      },
    },
    plugins: [],
  };