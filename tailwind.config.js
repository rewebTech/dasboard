/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './hooks/**/*.{js,jsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Brand
        accent: {
          DEFAULT: '#F5A623',
          dark:    '#D4891A',
          light:   '#FDF3DC',
          muted:   'rgba(245,166,35,0.12)',
        },
        // Neutral dark palette
        dark: {
          50:  '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          850: '#1a1a1a',
          900: '#111827',
          950: '#0d1117',
        },
        surface: {
          DEFAULT: '#1e1e1e',
          2: '#252525',
          3: '#2a2a2a',
        },
        status: {
          success: '#22c55e',
          'success-muted': 'rgba(34,197,94,0.12)',
          error:   '#ef4444',
          'error-muted':   'rgba(239,68,68,0.12)',
          warning: '#f59e0b',
          info:    '#3b82f6',
          'info-muted':    'rgba(59,130,246,0.12)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['10px', '14px'],
        xs:    ['11px', '16px'],
        sm:    ['12px', '18px'],
        base:  ['13px', '20px'],
        md:    ['14px', '22px'],
        lg:    ['16px', '24px'],
        xl:    ['18px', '28px'],
        '2xl': ['22px', '30px'],
        '3xl': ['28px', '36px'],
      },
      borderRadius: {
        sm: '6px',
        DEFAULT: '10px',
        lg: '14px',
        xl: '18px',
      },
      boxShadow: {
        card:  '0 2px 12px rgba(0,0,0,0.35)',
        modal: '0 8px 40px rgba(0,0,0,0.6)',
        sm:    '0 1px 6px rgba(0,0,0,0.2)',
      },
      animation: {
        'fade-in':    'fadeIn 0.2s ease',
        'slide-up':   'slideUp 0.25s ease',
        'shimmer':    'shimmer 1.5s infinite',
        'spin-slow':  'spin 2s linear infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0, transform: 'translateY(4px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        slideUp: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        shimmer: {
          '0%':   { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      },
    },
  },
  plugins: [],
};
