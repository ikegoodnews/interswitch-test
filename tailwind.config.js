/** @type {import('tailwindcss').Config} */
module.exports = {
   content: ['./src/**/*.{js,jsx,ts,tsx}'],
   // content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/**/*.{js,ts,jsx,tsx,mdx}'],
   theme: {
      colors: {
         'color-white': '#ffffff',
         'color-dark': '#000000',
         'color-1': '#ba0000',
         'color-1-hover': '#ba000098',
         'color-2': '#00336a',
         'color-2-hover': '#00336a98',
         'color-btn-hover': '#303030',
         'color-3-hover': '#34A85398',
      },
      container: {
         padding: '1rem',
         // screens: {
         //    sm: '600px',
         //    md: '728px',
         //    lg: '984px',
         //    xl: '1240px',
         //    '2xl': '1496px',
         // },
      },
      borderRadius: {
         50: '50%',
         4: '4px',
      },
      extend: {
         // boxShadow: {
         //    xl: '0 6px 13px -3px rgba(0, 0, 0, 0.25)',
         // },
         // backgroundImage: {
         //    'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
         //    'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
         // },
      },
   },
   variants: {},
   plugins: [],
};
