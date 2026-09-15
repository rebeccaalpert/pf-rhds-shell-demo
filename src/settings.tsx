import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  applyTheme,
  getThemeModeFromSchemeEvent,
  resolveTheme,
  type ThemeMode,
} from "./theme";

type SettingsContextValue = {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem("hb-theme");
    return stored === "dark" || stored === "light" || stored === "system"
      ? stored
      : "system";
  });

  useEffect(() => {
    applyTheme(resolveTheme(theme));
    localStorage.setItem("hb-theme", theme);

    if (theme !== "system") return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme(resolveTheme("system"));
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme]);

  useEffect(() => {
    const onSchemeChanged = (event: Event) => {
      const schemeTheme = getThemeModeFromSchemeEvent(event);
      if (!schemeTheme) return;

      setTheme((currentTheme) =>
        currentTheme === schemeTheme ? currentTheme : schemeTheme,
      );
    };

    document.addEventListener("scheme-changed", onSchemeChanged);
    return () => document.removeEventListener("scheme-changed", onSchemeChanged);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
}
