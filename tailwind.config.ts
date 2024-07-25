/** @type {import('tailwindcss').Config} */

export const createRGBFromVar = (varName: string, opacity?: number) => {
  return `rgb(from var(--${varName}) r g b / ${
    opacity ? opacity : '<alpha-value>'
  })`;
};

module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: createRGBFromVar('border'),
        input: createRGBFromVar('input'),
        ring: createRGBFromVar('ring'),
        background: createRGBFromVar('background'),
        foreground: createRGBFromVar('foreground'),
        primary: {
          DEFAULT: createRGBFromVar('primary'),
          foreground: createRGBFromVar('primary-foreground'),
        },
        secondary: {
          DEFAULT: createRGBFromVar('secondary'),
          foreground: createRGBFromVar('secondary-foreground'),
        },
        destructive: {
          DEFAULT: createRGBFromVar('destructive'),
          foreground: createRGBFromVar('destructive-foreground'),
        },
        muted: {
          DEFAULT: createRGBFromVar('muted'),
          foreground: createRGBFromVar('muted-foreground'),
        },
        accent: {
          DEFAULT: createRGBFromVar('accent'),
          foreground: createRGBFromVar('accent-foreground'),
        },
        popover: {
          DEFAULT: createRGBFromVar('popover'),
          foreground: createRGBFromVar('popover-foreground'),
        },
        card: {
          DEFAULT: createRGBFromVar('card'),
          foreground: createRGBFromVar('card-foreground'),
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
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
        progress: {
          '0%': { transform: ' translateX(0) scaleX(0)' },
          '40%': { transform: 'translateX(0) scaleX(0.4)' },
          '100%': { transform: 'translateX(100%) scaleX(0.5)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        progress: 'progress 1s infinite linear',
      },
      transformOrigin: {
        'left-right': '0% 50%',
      },
      typography: () => ({
        DEFAULT: {
          css: {
            color: 'var(--foreground)',
            '[class~="lead"]': {
              color: 'var(--foreground)',
            },
            a: {
              color: 'var(--primary)',
            },
            strong: {
              color: 'var(--foreground)',
            },
            'a strong': {
              color: 'var(--primary)',
            },
            'blockquote strong': {
              color: 'var(--foreground)',
            },
            'thead th strong': {
              color: 'var(--foreground)',
            },
            'ol > li::marker': {
              color: 'var(--foreground)',
            },
            'ul > li::marker': {
              color: 'var(--foreground)',
            },
            dt: {
              color: 'var(--foreground)',
            },
            blockquote: {
              color: 'var(--foreground)',
            },
            h1: {
              color: 'var(--foreground)',
            },
            'h1 strong': {
              color: 'var(--foreground)',
            },
            h2: {
              color: 'var(--foreground)',
            },
            'h2 strong': {
              color: 'var(--foreground)',
            },
            h3: {
              color: 'var(--foreground)',
            },
            'h3 strong': {
              color: 'var(--foreground)',
            },
            h4: {
              color: 'var(--foreground)',
            },
            'h4 strong': {
              color: 'var(--foreground)',
            },
            kbd: {
              color: 'var(--foreground)',
            },
            code: {
              color: 'var(--foreground)',
            },
            'a code': {
              color: 'var(--primary)',
            },
            'h1 code': {
              color: 'var(--foreground)',
            },
            'h2 code': {
              color: 'var(--foreground)',
            },
            'h3 code': {
              color: 'var(--foreground)',
            },
            'h4 code': {
              color: 'var(--foreground)',
            },
            'blockquote code': {
              color: 'var(--foreground)',
            },
            'thead th code': {
              color: 'var(--foreground)',
            },
            pre: {
              color: 'var(--foreground)',
            },
            'pre code': {
              color: 'var(--foreground)',
            },
            'thead th': {
              color: 'var(--foreground)',
            },
            figcaption: {
              color: 'var(--foreground)',
            },
          },
        },
      }),
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
};
