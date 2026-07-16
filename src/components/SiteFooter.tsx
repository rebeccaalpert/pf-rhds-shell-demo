import React, { useCallback } from "react";
import { MenuItem } from "@patternfly/react-core";
import { AdjustIcon, MoonIcon, SunIcon } from "@patternfly/react-icons";
import { useSettings } from "../settings";
import { InlineMenuDropdown } from "./InlineMenuDropdown";
import { useDropdown } from "../useDropdown";
import type { ThemeMode } from "../theme";

const THEME_OPTIONS = [
  { key: "light", label: "Light", Icon: SunIcon },
  { key: "dark", label: "Dark", Icon: MoonIcon },
  { key: "system", label: "System", Icon: AdjustIcon },
] as const;

export function SiteFooter() {
  const { theme, setTheme } = useSettings();
  const { isOpen, toggle, close } = useDropdown();

  const handleSelect = useCallback(
    (_event: React.MouseEvent | undefined, key: string | number | undefined) => {
      if (typeof key === "string") setTheme(key as ThemeMode);
      close();
    },
    [setTheme, close],
  );

  const active =
    THEME_OPTIONS.find((option) => option.key === theme) ?? THEME_OPTIONS[2];
  const ActiveIcon = active.Icon;

  return (
    <div className="hb-site-footer">
      <span className="hb-site-footer__site-name">Demo App</span>
      <InlineMenuDropdown
        className="hb-site-footer__dropdown"
        isOpen={isOpen}
        onToggle={toggle}
        onClose={close}
        onSelect={handleSelect}
        selected={theme}
        menuPlacement="above"
        toggleClassName="hb-site-footer__settings"
        toggleAriaLabel={`Theme: ${active.label}`}
        toggleLabel={
          <>
            <ActiveIcon aria-hidden />
            {active.label}
          </>
        }
      >
        {THEME_OPTIONS.map(({ key, label, Icon }) => (
          <MenuItem
            key={key}
            itemId={key}
            isSelected={theme === key}
            icon={<Icon aria-hidden />}
          >
            {label}
          </MenuItem>
        ))}
      </InlineMenuDropdown>
    </div>
  );
}
