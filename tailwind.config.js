import {heroui} from "@heroui/theme"

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        'burgundy': {
          DEFAULT: '#6B2C2C',
          dark: '#5A2424',
          light: '#7D3434',
        },
        'warm-red': {
          DEFAULT: '#C94545',
          dark: '#B33D3D',
          light: '#D65656',
        },
        'beige': {
          DEFAULT: '#F5F0ED',
          dark: '#EBE3DF',
          light: '#FAF7F5',
        },
        'stable-dark': '#2D2825',
        'stable-gray': '#6B6560',
        'jack-red': '#C32E2E',
        'jack-blue': '#1A2842',
      },
      backgroundColor: {
        'page': '#F5F0ED',
        'card': '#FFFFFF',
      },
      transitionTimingFunction: {
        'out-quad': 'cubic-bezier(.25, .46, .45, .94)',
        'out-cubic': 'cubic-bezier(.215, .61, .355, 1)',
        'out-quart': 'cubic-bezier(.165, .84, .44, 1)',
        'out-quint': 'cubic-bezier(.23, 1, .32, 1)',
        'out-expo': 'cubic-bezier(.19, 1, .22, 1)',
        'out-circ': 'cubic-bezier(.075, .82, .165, 1)',
        'in-out-quad': 'cubic-bezier(.455, .03, .515, .955)',
        'in-out-cubic': 'cubic-bezier(.645, .045, .355, 1)',
        'in-out-quart': 'cubic-bezier(.77, 0, .175, 1)',
        'in-out-quint': 'cubic-bezier(.86, 0, .07, 1)',
      },
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#F5F0ED",
            foreground: "#2D2825",
            primary: {
              DEFAULT: "#6B2C2C",
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#C94545",
              foreground: "#FFFFFF",
            },
            default: {
              DEFAULT: "#FFFFFF",
              foreground: "#2D2825",
            },
            content1: "#FFFFFF",
            content2: "#F5F0ED",
          },
        },
        dark: {
          colors: {
            background: "#1A1614",
            foreground: "#F5F0ED",
            primary: {
              DEFAULT: "#C94545",
              foreground: "#FFFFFF",
            },
            secondary: {
              DEFAULT: "#6B2C2C",
              foreground: "#FFFFFF",
            },
            default: {
              DEFAULT: "#2D2825",
              foreground: "#F5F0ED",
            },
            content1: "#2D2825",
            content2: "#3D3835",
          },
        },
      },
    }),
  ],
}

module.exports = config;