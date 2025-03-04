module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#EEAE56", // Warm golden for accents and key highlights
        secondary: "#219EBC", // Soft teal for interactive elements
        accent: "#9FD79A", // Muted green for softer contrast
        neutral: "#023047", // Deep navy-blue for text and headings
        background: "#FFFFFF", // Clean white background (enhanced readability)
        lightbg: "#FFFFFF", // Soft pastel peach for subtle sections
        border: "#E5E7EB", // Light gray for subtle dividers
        textlight: "#6B7280", // Neutral gray for body text
        warning: "#FB8500", // Orange for warnings/alerts
        danger: "#DC2626", // Red for errors
        muted: "#F9DDDC", // Soft pink for gentle highlights
      },
    },
  },
  plugins: [],
};
