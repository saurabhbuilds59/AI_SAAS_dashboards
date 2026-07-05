/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0D0F14',
          soft: '#151822',
          line: '#232838',
        },
        foam: {
          DEFAULT: '#EDEFF5',
          muted: '#8B93A7',
        },
        signal: {
          DEFAULT: '#6C5CE0',
          soft: '#8A7CF0',
          dim: '#2C2758',
        },
        pulse: {
          DEFAULT: '#2DD4BF',
          soft: '#5EEAD4',
        },
        amber: {
          DEFAULT: '#F5A623',
          soft: '#FBC873',
        },
        danger: {
          DEFAULT: '#F0556B',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(108,92,224,0.25), 0 8px 30px -10px rgba(108,92,224,0.45)',
      },
      keyframes: {
        pulseBar: {
          '0%, 100%': { transform: 'scaleY(0.35)', opacity: '0.5' },
          '50%': { transform: 'scaleY(1)', opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        pulseBar: 'pulseBar 1.2s ease-in-out infinite',
        fadeUp: 'fadeUp 0.4s ease-out both',
      },
    },
  },
  plugins: [],
}
