import type { Config } from "tailwindcss";

export default {
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
        gray1: "#D0D0D8",
        pendingBg: "#FFF3EB", // Светлый фон (кремовый)
        hoverOrange: "#FFAC70", // Светло-оранжевый (акцент)
        accentOrange: "#FF8B37", // Оранжевый (основной акцент)
        pressedOrange: "#E87928", // Темный оранжевый
        dark: "#1C1C21", // Темный (почти черный)
        wrong: "#EC6259", // Красный (ошибка, предупреждение)
        wrongBg: "#FDEEED", // Светло-красный (фон ошибки)
        success: "#47D867", // Зеленый (успех)
        successBg: "#E6FAEA", // Светлый зеленый (фон успеха)
        grayBg: "#F5F5F7", // Светло-серый (фон)
      },
    },
  },
  plugins: [],
} satisfies Config;
