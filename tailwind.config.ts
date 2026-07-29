import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d94668",
        secondary: "#f9a8d4",
        ink: "#3b2f2f",
        soft: "#fff7fb",
      },
      fontFamily: {
        // Font nạp bằng next/font, fallback là font hệ thống có hỗ trợ tiếng Việt
        sans: ["var(--font-sans)", "Segoe UI", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Times New Roman", "serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
