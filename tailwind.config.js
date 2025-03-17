module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-primary": "#1D1D1F", // Apple Black (used in dark mode UI)
        "app-secondary": "#F5F5F7", // Apple Light Gray (subtle backgrounds)
        "app-highlight": "#0071E3", // Apple Blue (for accents and call-to-actions)
        "app-accent": "#FFD60A", // Apple Yellow (adds energy, like cocktail garnishes)
        "app-background": "#FFFFFF", // Pure white for clean UI
      },
      fontFamily: {
        "app-main": ["Inter", "sans-serif"],  // Clean and readable like SF Pro
        "app-heading": ["Work Sans", "sans-serif"],  // Modern and minimal
        "app-text": ["DM Sans", "sans-serif"],  // Rounded and balanced for UI
        "app-quote": ["Space Grotesk", "sans-serif"],  // Premium and high-tech look
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
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
