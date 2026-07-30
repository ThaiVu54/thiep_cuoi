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
        // Vintage burgundy palette
        primary: "#722F37", // Burgundy/wine red
        "primary-dark": "#5a252c",
        "primary-light": "#8b3a44",
        secondary: "#D4AF37", // Gold accent
        cream: "#FDF8F3", // Warm cream background
        "cream-dark": "#F5EDE3",
        ivory: "#FFFFF0",
        ink: "#2C1810", // Dark brown text
        "ink-light": "#4A3728",
        soft: "#FAF6F1",
        gold: "#C9A227",
        "gold-light": "#E8D5A3",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Segoe UI", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Times New Roman", "serif"],
        script: ["var(--font-script)", "cursive"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "envelope-open-top": {
          "0%": { transform: "rotateX(0deg)" },
          "100%": { transform: "rotateX(-180deg)" },
        },
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "envelope-open": "envelope-open-top 0.8s ease-out forwards",
      },
      backgroundImage: {
        "vintage-pattern": "url('/images/decorations/pattern.svg')",
        "floral-corner": "url('/images/decorations/floral-corner.svg')",
      },
    },
  },
  plugins: [],
};

export default config;
