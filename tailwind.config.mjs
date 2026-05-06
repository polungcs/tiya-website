/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        orange: '#EF9F27',
        terra: '#CE5942',
        'terra-deep': '#B8401E',
        cream: '#FFFAF0',
        'cream-warm': '#FAEEDA',
        'cream-deep': '#F5DFB6',
        ink: '#2A1A0A',
        'ink-soft': '#5C4317',
      },
    },
  },
  plugins: [],
};
