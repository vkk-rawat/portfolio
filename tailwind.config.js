/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      colors: {
        terminal: {
          bg: "#0d1117",
          text: "#c9d1d9",
          accent: "#f0883e",
          link: "#58a6ff",
          muted: "#8b949e",
          error: "#f97583",
          border: "#30363d",
          prompt: "#2dd4bf",
        },
      },
      animation: {
        blink: "blink 1s steps(1) infinite",
      },
      keyframes: {
        blink: {
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
