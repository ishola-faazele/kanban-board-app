/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryColor: '#2A9D8F',       // Teal
        secColor: '#E76F51',           // Coral
        bgColor: '#1A202C',            // Darkish background
        cardBgColor: '#2C3848',        // Dark card background
        columnBgColor: '#E9C46A',      // Sand
        textColor: '#FFFFFF',          // White text
        accentColor: '#F4A261',        // Peach
      },
    },
  },
  plugins: [],
}
