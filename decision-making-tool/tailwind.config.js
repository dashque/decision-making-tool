/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        'victor-mono': ['Victor Mono', 'Courier New', 'Courier', 'monospace'],
      },
    },
  },
  plugins: [],
};
