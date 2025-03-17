module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-flame": "#E4572E",
        "app-thin-flame": "#FF572E",
        "app-cadet": "#29335C",
        "app-olivine": "#A8C686",
        "app-bg": "#F8F8F6",
      },
      fontFamily: {
        "app-main": ["Inter", "sans-serif"], // Clean and readable like SF Pro
        "app-heading": ["Work Sans", "sans-serif"], // Modern and minimal
        "app-text": ["DM Sans", "sans-serif"], // Rounded and balanced for UI
        "app-quote": ["Space Grotesk", "sans-serif"], // Premium and high-tech look
        "cocktail-name": ["Work Sans", "sans-serif"],  // Use Work Sans for cocktail names
        "ingredient-name": ["DM Sans", "sans-serif"], // Use DM Sans for ingredient names
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
       fontSize: {
         'cocktail-name': '1.2em', // 20% bigger (1em is the base size)
         'ingredient-name': '1.2em',
       },
        fontWeight: {
         'cocktail-name': '700',  // Or '800'/'900' if '700' is not bold enough
         'ingredient-name': '700', // Adjust these values as needed.
       }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
