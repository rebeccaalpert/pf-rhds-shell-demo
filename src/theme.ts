export type ThemeMode = "dark" | "light" | "system";
export type ResolvedThemeMode = "dark" | "light";

const DARK_CLASS = "pf-v6-theme-dark";

export const applyTheme = (theme: ResolvedThemeMode) => {
  const root = document.documentElement;
  root.classList.toggle(DARK_CLASS, theme === "dark");
};

export const getSystemPreferredTheme = (): ResolvedThemeMode =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const resolveTheme = (theme: ThemeMode): ResolvedThemeMode =>
  theme === "system" ? getSystemPreferredTheme() : theme;

const isThemeMode = (value: unknown): value is ThemeMode =>
  value === "dark" || value === "light" || value === "system";

export const getThemeModeFromSchemeEvent = (event: Event): ThemeMode | null => {
  const scheme = (event as Event & { scheme?: unknown; detail?: { scheme?: unknown } }).scheme
    ?? (event as Event & { detail?: { scheme?: unknown } }).detail?.scheme;

  return isThemeMode(scheme) ? scheme : null;
};
