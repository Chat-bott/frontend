/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'highlight': 'highlight 2s ease-in-out 3',
        'fadeIn': 'fadeIn 0.3s',
        'typing': 'typing 1.4s infinite',
      },
      keyframes: {
        highlight: {
          '0%, 100%': {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
          '50%': {
            backgroundColor: 'rgba(255, 255, 0, 0.3)',
            boxShadow: '0 0 20px rgba(255, 255, 0, 0.5)',
          },
        },
        fadeIn: {
          'from': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        typing: {
          '0%, 60%, 100%': {
            transform: 'translateY(0)',
            opacity: '0.7',
          },
          '30%': {
            transform: 'translateY(-10px)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [],
}
