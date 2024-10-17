import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'hof-gold': '#C5A558',
        'hof-dark-blue': '#16252C',
        'hof-green': '#2B9648',
        'hof-red': '#E24244',
      },
    },
  },
  plugins: [],
};
export default config;
