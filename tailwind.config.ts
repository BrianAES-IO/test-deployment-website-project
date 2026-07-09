import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{mdx,md}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F7F3EA",
        ink: "#16223A",
        "ink-muted": "#4B5468",
        /* Logo's electric blue. Flat fill only: the gradient lives in the logo file, not the UI. */
        brand: "#1450D6",
        "brand-deep": "#0D3AA8",
        /* Brighter blue for accessible contrast on dark surfaces (footer, dark CTA bands). */
        "brand-light": "#6C93FF",
        surface: "#EFE8D8",
        line: "#DCD3BE",
        footer: "#12181D",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      maxWidth: {
        measure: "42rem",
      },
      transitionTimingFunction: {
        brand: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-rise": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-rise": "fade-rise 0.6s ease-out both",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
