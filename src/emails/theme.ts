/**
 * Shared Visual Theme Constants for React Email Tailwind Templates
 */
export const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        brandBg: "#0b0f17",             // Deep Charcoal
        brandSurface: "#111827",        // Slate 900 / Container background
        brandBorder: "#1f2937",         // Slate 800 / Border lines
        brandTextPrimary: "#f8fafc",    // Slate 50 / Headlines
        brandTextSecondary: "#cbd5e1",  // Slate 300 / Body copy
        brandTextMuted: "#94a3b8",      // Slate 400 / Labels and subheadings
        brandTextMutedDark: "#4b5563",  // Slate 600 / Footer notes
        brandPrimary: "#38bdf8",        // Electric Cyan
        brandSuccess: "#34d399",        // Emerald Accent
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["Fira Code", "JetBrains Mono", "Monaco", "Consolas", "monospace"],
      },
    },
  },
};
