import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Daftarkan font yang tadi dibuat di layout
        sans: ['var(--font-inter)'], 
        header: ['var(--font-poppins)'], 
      },
      colors: {
        'accent-red': '#914150',  
        'deep-purple': '#2A2242', 
        'lavender': '#BFBACF',    
        'white': '#FFFFFF',
      },
    },
  },
  plugins: [],
};
export default config;