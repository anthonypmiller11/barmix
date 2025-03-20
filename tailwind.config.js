module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-flame": "#E4572E",
        "app-thin-flame": "#FF572E",
        "app-cadet": "#29335C",
        "app-olivine": "#6B8E23",
        "app-bg": "#F8F8F6",
      },
      fontFamily: {
        "app-main": ["Inter", "sans-serif"],
        "app-heading": ["Work Sans", "sans-serif"],
        "app-text": ["DM Sans", "sans-serif"],
        "app-quote": ["Space Grotesk", "sans-serif"],
        "cocktail-name": ["Work Sans", "sans-serif"],
        "ingredient-name": ["DM Sans", "sans-serif"],
      },
      fontSize: {
        'cocktail-name': ['20px', { sm: '22px', lg: '24px' }], // Responsive: 20px (base), 22px (sm), 24px (lg)
        'ingredient-name': '1.4em',
      },
      gridTemplateColumns: {
        "two-by-two": "minmax(0, 1fr) 12px minmax(0, 1fr)",
      },
      gridTemplateRows: {
        "sm-main-grid":
          "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 0.4fr) minmax(0, 1fr) minmax(0, 1fr)",
        "md-main-grid":
          "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 0.6fr) minmax(0, 1fr) minmax(0, 1fr)",
        "xl-main-grid":
          "minmax(0, 1fr) minmax(0, 1fr) minmax(0, 0.5fr) minmax(0, 1fr) minmax(0, 1fr)",
      },
      keyframes: {
        expand: {
          "50%": { transform: "scale(1.1)" },
        },
        loading: {
          to: { "background-position-x": "-20%" },
        },
      },
      animation: {
        expand: "expand 1s ease-in-out infinite",
        loading: "1s loading ease-in-out infinite",
      },
      screens: {
        'xs': '345px',
        'sm': '640px',
        'md': '768px',
        'lg': '1050px',
        'xl': '1380px',
        '2xl': '1536px',
      },
      fontWeight: {
        // Optionally uncomment if you want to adjust weight
        // 'cocktail-name': '800',
        // 'ingredient-name': 'bold',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
