/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ndvi-green': '#22c55e',
        'ndvi-yellow': '#eab308',
        'ndvi-red': '#ef4444',
        'research-dark': '#0f172a',
        'research-gray': '#1e293b',
      },
    },
  },
  plugins: [],
}

