module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-body)", "sans-serif"],
      },
      colors: {
        skin: {
          theme: "var(--main-theme-color)",
        },
      },
      textColor: {
        skin: {
          base: "var(--color-text-base)",
          inverted: "var(--color-text-inverse",
          shade: "var(--color-text-shade)",
          theme: "var(--color-text-theme)",
          tint: "var(--main-theme-color-tint-1)",
          heading: "var(--main-theme-color-shade-2)",
          body: "var(--main-theme-background)",
          accent: "var(--main-theme-olive)",
          "accent-tint": "var(--main-theme-olive-tint)",
        },
      },
      backgroundColor: {
        skin: {
          fill: "var(--main-theme-color)",
          muted: "var(--color-fill-muted)",
          shade: "var(--main-theme-color-shade-1)",
          "button-fill": "var(--main-theme-color)",
          body: "var(--main-theme-background)",
          tint: "var(--main-theme-color-tint-1)",
          light: "var(--main-theme-color-tint-3)",
          "brown-600": "#6d4c41",
          accent: "var(--main-theme-accent-color)",
          "accent-shade": "var(--main-theme-accent-color-shade-1)",
        },
      },
      borderColor: {
        skin: {
          base: "var(--color-border-base)",
          tint: "var(--main-theme-color-tint-1)",
          theme: "var(--main-theme-color)",
        },
      },
      ringColor: {
        skin: {
          tint: "var(--main-theme-color-tint-1)",
          theme: "var(--main-theme-color)",
          shade: "var(--main-theme-color-shade-1)",
        },
      },
      ringOffsetColor: {
        skin: {
          tint: "var(--main-theme-color-tint-1)",
          theme: "var(--main-theme-color)",
          shade: "var(--main-theme-color-shade-1)",
        },
      },
      animation: {
        "ping-slow": "ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;",
      },
      borderRadius: {
        30: "30px",
      },
      minHeight: {
        60: "60px",
      },
      maxHeight: {
        80: "80px",
      },
      boxShadow: {
        "inset-line": "0 -1px rgba(209, 213, 219) inset",
        line: "0 -1px rgba(209, 213, 219)",
        both: "1px 1px rgba(209, 213, 219), -1px -1px rgba(209, 213, 219)",
      },
      flex: {
        "initial-50": "0 1 50%",
      },
      maxWidth: {
        9: "8.75rem",
        12.5: "12.5rem",
        210: "210px",
      },
      zIndex: {
        "z-1": "-1",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
}
