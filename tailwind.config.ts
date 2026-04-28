import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        omega: {
          purple: "#6D2077",
          "purple-dark": "#4A1554",
          gold: "#B7A57A",
        },
        royal: {
          DEFAULT: "#6D2077",
          deep: "#4A1554",
        },
        gold: {
          DEFAULT: "#B7A57A",
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "ui-serif", "Georgia", "serif"],
        sans: ['"DM Sans"', "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        regalia:
          "0 20px 45px -15px rgba(74, 21, 84, 0.45), 0 8px 16px -8px rgba(74, 21, 84, 0.25)",
        gilded:
          "0 12px 30px -10px rgba(183, 165, 122, 0.55), 0 4px 10px -4px rgba(74, 21, 84, 0.25)",
        chapter:
          "0 10px 25px -12px rgba(109, 32, 119, 0.35), 0 2px 6px -2px rgba(0, 0, 0, 0.08)",
      },
      backgroundImage: {
        "regalia-gradient":
          "linear-gradient(135deg, #4A1554 0%, #6D2077 60%, #8B2C9A 100%)",
        "gilded-gradient":
          "linear-gradient(135deg, #B7A57A 0%, #D6C28F 50%, #B7A57A 100%)",
      },
      letterSpacing: {
        regalia: "0.04em",
      },
    },
  },
  plugins: [],
};

export default config;
