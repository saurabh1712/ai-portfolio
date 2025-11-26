import type { Config } from "tailwindcss";

const config: Config = {
  content: [
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
],
  theme: {
    extend: {
      colors: {
        background: "#050505", // Void Black
        primary: "#00f3ff",    // Cyber Cyan
        secondary: "#bd00ff",  // Electric Purple
        success: "#00ff41",    // Matrix Green
        surface: "#0a0a0a",    // Card Background
      },
      fontFamily: {
        mono: ['var(--font-geist-mono)', 'monospace'],
        sans: ['var(--font-geist-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;