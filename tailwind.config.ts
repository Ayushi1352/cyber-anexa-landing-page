import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      borderColor: {
        DEFAULT: "currentColor",
      },
      fontFamily: {
        sans: ["var(--font-primary)"],
        heading: ["var(--font-heading)"],
      },
      animation: {
        // gentle bob of the floating cards around the hero photo
        float: "float 6s ease-in-out infinite",
        // the light line that sweeps down the hero photo like a scanner
        scan: "scan 4.5s cubic-bezier(0.65, 0, 0.35, 1) infinite",
        // slow turn of the dashed rings behind the photos
        "spin-slow": "spin 40s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-0.625rem)" },
        },
        scan: {
          "0%": { top: "0%", opacity: "0" },
          "10%, 90%": { opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
      },
    },
  },
  plugins: [
    // Variants built into Tailwind v4 that v3 does not have.
    plugin(({ addVariant }) => {
      addVariant("starting", "@starting-style");
    }),
  ],
};
export default config;
