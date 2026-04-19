import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx,js,jsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Warm, community-focused palette
        cream: {
          50: '#FEFBF6',
          100: '#FAF5EC',
          200: '#F3EADA',
          300: '#E8DDC8',
        },
        clay: {
          50: '#FBF1EC',
          100: '#F5DDD1',
          200: '#ECBDA8',
          300: '#E09879',
          400: '#D87355',
          500: '#C55C3E',
          600: '#A84930',
          700: '#853928',
        },
        sage: {
          50: '#F2F5EE',
          100: '#DFE7D3',
          200: '#C1CFAC',
          300: '#A0B585',
          400: '#829868',
          500: '#6B8057',
          600: '#556645',
          700: '#3F4D34',
        },
        ink: {
          DEFAULT: '#2B2926',
          soft: '#52504C',
          muted: '#8A8680',
          faint: '#B8B4AD',
        },
        gold: {
          100: '#F7E9C2',
          300: '#E9C46A',
          500: '#C9A341',
        },
      },
      fontFamily: {
        serif: ['var(--font-fraunces)', 'ui-serif', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
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
        soft: '0 1px 2px rgba(43, 41, 38, 0.04), 0 4px 16px rgba(43, 41, 38, 0.06)',
        lift: '0 2px 4px rgba(43, 41, 38, 0.06), 0 12px 32px rgba(43, 41, 38, 0.08)',
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
