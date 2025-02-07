/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Aplica Tailwind em todos os arquivos dentro de src
    "./app/**/*.{js,ts,jsx,tsx}", // Aplica Tailwind nos arquivos dentro de app
    "./components/**/*.{js,ts,jsx,tsx}", // Aplica Tailwind nos componentes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
