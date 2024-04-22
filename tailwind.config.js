/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-deep-red': '#DD3F47',
        'custom-border-gray': '#D1D5D8',
        'custom-menu-popup-red': '#FFDADC',
        'custom-hover-red': '#FFDADC',
        'custom-background-gray': '#F4F4F3',

        'primary-red': '#FF6971',
        'primary-blue': '#918AFF',
        'primary-yellow': '#C78E00',
        'primary-gray': '#85898A',
        'primary-black': '#2F2F31',

        'secondary-red': '#FFEDEE',
        'secondary-blue': '#E7E3FF',
        'secondary-yellow': '#FFF4D4',
        'secondary-gray': '#E0E5E9',
      },
    },
    fontSize: {
      sm: ['1.2rem', '1.4rem'],
      base: ['1.4rem', '1.8rem'],
      md: ['1.6rem', '1.9rem'],
      lg: ['2rem', '2.4rem'],
      xl: ['2.2rem', '2.6rem'],
      '2xl': ['3.4rem', '4.1rem'],
    },

    fontFamily: {
      pretended: ['Pretendard', 'sans-serif'],
    },
  },
  corePlugins: {
    preflight: true,
  },
};
