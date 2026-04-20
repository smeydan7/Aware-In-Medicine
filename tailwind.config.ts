import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Aware in Medicine brand palette
        cream: {
          50: '#FFFFFF',
          100: '#F5F0E8',
          200: '#EAE5DC',
          300: '#E8F3EF',
        },
        clay: {
          50: '#E8F3EF',
          100: '#D9EAE4',
          200: '#B9D8CE',
          300: '#7FAE9F',
          400: '#2C6B5A',
          500: '#2C6B5A',
          600: '#1D5244',
          700: '#164236',
        },
        sage: {
          50: '#F3F8F6',
          100: '#E8F3EF',
          200: '#D9EAE4',
          300: '#B9D8CE',
          400: '#7FAE9F',
          500: '#2C6B5A',
          600: '#1D5244',
          700: '#164236',
        },
        ink: {
          DEFAULT: '#1A1A1A',
          soft: '#4A4A4A',
          muted: '#4A4A4A',
          faint: '#9C968D',
        },
        gold: {
          100: '#E8F3EF',
          300: '#2C6B5A',
          500: '#1D5244',
        },
      },
      fontFamily: {
        sans: ['"Trebuchet MS"', 'sans-serif'],
        serif: ['"Trebuchet MS"', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 6vw, 5.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 4.5vw, 3.75rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        prose: '68ch',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(26, 26, 26, 0.04), 0 4px 16px rgba(26, 26, 26, 0.06)',
        lift: '0 2px 4px rgba(26, 26, 26, 0.06), 0 12px 32px rgba(26, 26, 26, 0.08)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fadeIn 0.4s ease-out both',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;