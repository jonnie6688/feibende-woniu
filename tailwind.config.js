/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // 基础暗色背景层
        base: {
          DEFAULT: '#08090d',
          elevated: '#0d0f14',
          card: '#11141b',
        },
        // 表面层
        surface: {
          DEFAULT: '#141720',
          hover: '#1a1e2a',
          border: '#1e2230',
        },
        // 文本色阶
        'text-primary': '#e8eaef',
        'text-secondary': '#9699a6',
        'text-muted': '#5c5f6b',
        // 强调色 — 炽烈红
        accent: {
          DEFAULT: '#E53935',
          dim: '#C62828',
          glow: '#FF6B6B',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'reveal-up': 'revealUp 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'reveal-down': 'revealDown 0.7s cubic-bezier(0.25, 1, 0.5, 1) forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'line-grow': 'lineGrow 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
      },
      keyframes: {
        revealUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        revealDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        lineGrow: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '33%': { transform: 'translateY(-8px) rotate(0.5deg)' },
          '66%': { transform: 'translateY(4px) rotate(-0.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      backgroundImage: {
        'grid-dot': 'radial-gradient(circle, rgba(229,57,53,0.08) 1px, transparent 1px)',
        'gradient-radial-t': 'radial-gradient(ellipse at 50% 0%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
