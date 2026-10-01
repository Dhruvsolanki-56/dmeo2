/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  // react-phone-number-input renders these class names itself at runtime
  // (inside PhoneField.jsx) -- Tailwind's content scan only sees literal
  // JSX/HTML text, so it can never find them there and would otherwise purge
  // the custom `.PhoneInput*` rules in index.css as "unused" in production.
  safelist: [
    "PhoneInput",
    "PhoneInputInput",
    "PhoneInputCountry",
    "PhoneInputCountrySelect",
    "PhoneInputCountrySelectArrow",
    "PhoneInputCountryIcon",
    "PhoneInputCountryIconImg",
  ],
  theme: {
    extend: {
      // Demo 2: soft, rounded, purple-led (modelled on large pharma sites).
      borderRadius: {
        md: "10px",
        lg: "12px",
        xl: "16px",
        "2xl": "20px",
        "3xl": "28px",
      },
      colors: {
        // Brand purple, taken from the logo. 600 is the interactive colour and
        // the highlight in headings; 950 is the deep ink.
        primary: {
          50: "#f5f2ff",
          100: "#ebe5ff",
          200: "#d6ccff",
          300: "#b8a6fb",
          400: "#9475f3",
          500: "#7a52e8",
          600: "#6335d6",
          700: "#5228b4",
          800: "#432293",
          900: "#371e75",
          950: "#1c0f42",
        },
        // Pink-violet, for gradients and small marks only.
        accent: {
          50: "#fdf0fb",
          100: "#fbe0f6",
          300: "#f2a8e4",
          400: "#e97cd2",
          500: "#d94fbd",
          600: "#bb3aa1",
          700: "#962d80",
        },
        panel: "#f6f3ff",
        ink: "#1a1630",
      },
      fontFamily: {
        display: ["Figtree", "system-ui", "sans-serif"],
        sans: ["Figtree", "system-ui", "sans-serif"],
      },
      fontSize: {
        display: ["clamp(2.3rem, 4.2vw, 3.6rem)", { lineHeight: "1.12", letterSpacing: "-0.015em" }],
        "display-sm": ["clamp(1.8rem, 2.8vw, 2.5rem)", { lineHeight: "1.18", letterSpacing: "-0.01em" }],
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(28 15 66 / 0.05)",
        "card-hover": "0 2px 8px -2px rgb(28 15 66 / 0.10)",
        pill: "0 4px 18px -6px rgb(28 15 66 / 0.25)",
        soft: "0 18px 50px -24px rgb(28 15 66 / 0.30)",
        ledge: "none",
        "ledge-blue": "none",
      },
    },
  },
  plugins: [],
};
