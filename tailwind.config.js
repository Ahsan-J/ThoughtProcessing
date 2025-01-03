import theme from './theme';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-mode="dark"]'],
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      borderColor: theme.borderColor,
      backgroundColor: theme.backgroundColor,
      backgroundImage: {
        "author-desk": "url('/assets/auth/login_image.jpg')"
      },
      textColor: theme.textColor,
      outlineColor: theme.outlineColor,
      fontSize: theme.fontSize,
      gradientColorStops: theme.backgroundColor,
      fill: theme.backgroundColor,
      colors: theme.backgroundColor,
      keyframes: {
        cursor: {
          "0%": {
            opacity: 0,
          },

          "40%": {
            opacity: 0,
          },

          "50%": {
            opacity: 1,
          },

          "90%": {
            opacity: 1,
          },

          "100%": {
            opacity: 0,
          }
        }
      }
    },
    screens: {
      'xxs': '340px',
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  },
  plugins: [],
}

