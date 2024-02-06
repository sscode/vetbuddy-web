import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'clay': {
          DEFAULT: '#8B555F',
          50: '#F2EEEA',
          100: '#E8DED9',
          200: '#D2BCB6',
          300: '#BD9793',
          400: '#A87073',
          500: '#8B555F',
          600: '#754756',
          700: '#5F3A4B',
          800: '#492C3D',
          900: '#321F2D',
          950: '#271824'
        },
      },
    },
  },
  plugins: [],
};
export default config;
