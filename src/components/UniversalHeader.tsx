import React, { useMemo } from "react";
import { NavigationPrimary } from "@rhds/elements/react/rh-navigation-primary/rh-navigation-primary.js";
import "@rhds/tokens/css/global.css";
import "@rhds/elements/rh-navigation-primary/rh-navigation-primary-lightdom.css";
import { useSettings } from "../settings";

export function UniversalHeader() {
  const { theme } = useSettings();

  const colorPalette = useMemo(() => {
    if (theme === "dark") return "darkest" as const;
    if (theme === "light") return "lightest" as const;
    return undefined;
  }, [theme]);

  return (
    <header className="hb-universal-header">
      <NavigationPrimary
        siteName="Demo App"
        siteHref="#"
        accessibleLabel="Demo masthead"
        {...(colorPalette ? { colorPalette } : {})}
      />
    </header>
  );
}
