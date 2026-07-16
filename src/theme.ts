export type ThemeMode = "dark" | "light" | "system";
export type ResolvedThemeMode = "dark" | "light";

const DARK_CLASS = "pf-v6-theme-dark";
const LIGHT_CLASS = "pf-v6-theme-light";

export const applyTheme = (theme: ResolvedThemeMode) => {
  const root = document.documentElement;
  root.classList.toggle(DARK_CLASS, theme === "dark");
  root.classList.toggle(LIGHT_CLASS, theme === "light");
  root.setAttribute("data-theme", theme);
};

export const getSystemPreferredTheme = (): ResolvedThemeMode =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const resolveTheme = (theme: ThemeMode): ResolvedThemeMode =>
  theme === "system" ? getSystemPreferredTheme() : theme;
