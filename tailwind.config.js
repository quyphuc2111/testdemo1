/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "why-me-radial-gradient":
          "radial-gradient(100% 100% at 100% 50%, #D4EBD9 0%, #AAD8B2 36.55%, #8DCB98 79.33%, #7FC48C 100%)",
        "banner-top-background": "url('/banner-top.svg')",
        "lms-background": "url('/lms-background.svg')",
        "play-and-learn-background": "url('/play-and-learn.svg')",
        "stem-background": "url('/STEM.svg')",
        "mindmap-background": "url('/Mindmap.svg')",
      },
      fontFamily: {
        "pf-beau": ["PF Beau Sans Pro", "sans-serif"],
      },
    },
  },
  plugins: [],
};
