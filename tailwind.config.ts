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
        // Pastel modern palette
        canvas: "#FBF9F6", // Nền trang
        surface: "#FFFFFF", // Nền thẻ / card
        "surface-sunk": "#F4EFE9", // Nền chìm, ô input
        sage: "#93A98F", // Màu thương hiệu chính
        "sage-deep": "#6D8570", // Hover / chữ nhấn
        "sage-soft": "#E4EBE2", // Nền nhạt, chip
        blush: "#EDC9C3", // Điểm nhấn phụ
        "blush-soft": "#FAEDEA", // Nền nhấn phụ
        ink: "#3B3733", // Chữ chính
        "ink-muted": "#8A827A", // Chữ phụ, caption
        line: "#E8E1D8", // Viền 1px

        // Alias tương thích ngược — giữ để components/ui/* và trang admin không vỡ
        primary: "#6D8570",
        "primary-dark": "#55684F",
        "primary-light": "#93A98F",
        secondary: "#EDC9C3",
        cream: "#FBF9F6",
        "cream-dark": "#F4EFE9",
        ivory: "#FFFFFF",
        "ink-light": "#8A827A",
        soft: "#F4EFE9",
        gold: "#EDC9C3",
        "gold-light": "#FAEDEA",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Segoe UI", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Times New Roman", "serif"],
        script: ["var(--font-script)", "cursive"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(59,55,51,.04), 0 8px 24px -12px rgba(59,55,51,.10)",
        lift: "0 12px 32px -16px rgba(59,55,51,.18)",
      },
      keyframes: {
        "envelope-open-top": {
          "0%": { transform: "rotateX(0deg)" },
          "100%": { transform: "rotateX(-180deg)" },
        },
      },
      animation: {
        "envelope-open": "envelope-open-top 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};

export default config;
