module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#E3A869", // Warm, muted gold for key highlights
        secondary: "#006C67", // Softer teal, more modern and less saturated
        accent: "#ABE188", // Balanced green for softer contrast
        soft: "#40826d",

        neutral: "#2C3E50", // Deep navy-blue, easier to read than pure black
        background: "#F9F9F9", // Light neutral white for modern UI
        lightbg: "#FFFFFF", // True white for contrast against content
        border: "#D1D5DB", // Muted gray for subtle dividers

        textlight: "#4A4A4A", // Softer gray for body text, easier on the eyes
        warning: "#F4A261", // Softer burnt orange for alerts
        danger: "#A41623", // Refined red, less harsh than pure red
        muted: "#EED3D2", // Soft pastel pink for highlights
        white: "#FFFFFF"
      },
    },
  },
  plugins: [],
};
