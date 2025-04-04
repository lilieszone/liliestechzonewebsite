/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
  prefix: '',
  safelist: [
    'lg:col-span-4',
    'lg:col-span-6',
    'lg:col-span-8',
    'lg:col-span-12',
    'border-border',
    'bg-card',
    'border-error',
    'bg-error/30',
    'border-success',
    'bg-success/30',
    'border-warning',
    'bg-warning/30',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        '2xl': '2rem',
        DEFAULT: '1rem',
        lg: '2rem',
        md: '2rem',
        sm: '1rem',
        xl: '2rem',
      },
      // screens: {
      //   '2xl': '86rem',
      //   lg: '64rem',
      //   md: '48rem',
      //   sm: '40rem',
      //   xl: '80rem',
      // },
    },
    extend: {
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        background: {
          DEFAULT: 'var(--background)',
          light: '#ffffff',
          dark: '#0c0c0c',
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          light: '#0c0c0c',
          dark: '#ffffff',
        },
        card: {
          DEFAULT: 'var(--card)',
          light: '#f5f5f5',
          dark: '#1e1e1e',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          light: '#ffffff',
          dark: '#1e1e1e',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          light: '#00b4a2',
          dark: '#00b4a2',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          light: '#ffdd00',
          dark: '#ffdd00',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          light: '#666666',
          dark: '#cccccc',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          light: '#e53e3e',
          dark: '#ff4d4d',
        },
        border: {
          // Correct naming for border colors
          DEFAULT: 'var(--border)',
          light: '#e0e0e0',
          dark: '#00b4a2',
        },
        input: {
          DEFAULT: 'var(--input)',
          light: '#f5f5f5',
          dark: '#1e1e1e',
        },
        ring: {
          DEFAULT: 'var(--ring)',
          light: '#ffdd00',
          dark: '#ffdd00',
        },
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Use your chosen font
        anton: ['Anton', 'sans-serif'],
        londrina: ['Londrina', 'sans-serif'],
        pacifico: ['Pacifico', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: [
            {
              '--tw-prose-body': 'var(--text)',
              '--tw-prose-headings': 'var(--text)',
              h1: {
                fontWeight: 'normal',
                marginBottom: '0.25em',
              },
            },
          ],
        },
        base: {
          css: [
            {
              h1: {
                fontSize: '2.5rem',
              },
              h2: {
                fontSize: '1.25rem',
                fontWeight: 600,
              },
            },
          ],
        },
        md: {
          css: [
            {
              h1: {
                fontSize: '3.5rem',
              },
              h2: {
                fontSize: '1.5rem',
              },
            },
          ],
        },
      }),
    },
  },
}
