"use client";

import { useTheme } from "@/components/theme-provider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="relative h-7 w-14 rounded-full border border-ink/20 dark:border-bone/20 bg-paper dark:bg-graphite transition-colors"
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-marker transition-transform ${
          isDark ? "translate-x-7" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}