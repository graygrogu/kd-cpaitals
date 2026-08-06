import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1rem", sm: "1.5rem", lg: "2rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        navy: {
          50: "#F2F5FA", 100: "#E3EAF4", 200: "#C2D0E5", 300: "#93AACE",
          400: "#5C7CB0", 500: "#365A95", 600: "#23447A", 700: "#193562",
          800: "#112750", 900: "#0A1F44", 950: "#061229",
        },
        brand: {
          50: "#ECFDF5", 100: "#D1FAE5", 200: "#A7F3D0", 300: "#6EE7B7",
          400: "#34D399", 500: "#0E9F6E", 600: "#0B815A", 700: "#0A6647",
          800: "#08513A", 900: "#064231",
        },
        sand: { 50: "#FAFAF8", 100: "#F4F4F0", 200: "#E9E9E2" },
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans Devanagari", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "Noto Sans Devanagari", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(10,31,68,0.04), 0 8px 24px -8px rgba(10,31,68,0.10)",
        lift: "0 2px 4px rgba(10,31,68,0.04), 0 18px 44px -12px rgba(10,31,68,0.18)",
        ring: "0 0 0 1px rgba(10,31,68,0.06)",
      },
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up": { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(calc(-50% - var(--gap)/2))" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
        "pulse-ring": {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "70%": { transform: "scale(1.6)", opacity: "0" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
      },
      animation: {
        "accordion-down": "accordion-down 0.25s ease-out",
        "accordion-up": "accordion-up 0.25s ease-out",
        marquee: "marquee var(--duration) linear infinite",
        shimmer: "shimmer 2.5s infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
