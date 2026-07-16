import React, { useEffect, useRef } from "react";
import {
  Menu,
  MenuContent,
  MenuList,
  MenuToggle,
} from "@patternfly/react-core";

type InlineMenuDropdownProps = {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  onSelect: (
    event: React.MouseEvent | undefined,
    itemId: string | number | undefined,
  ) => void;
  selected?: string | number;
  toggleLabel: React.ReactNode;
  toggleAriaLabel: string;
  toggleClassName?: string;
  menuPlacement?: "below" | "above";
  className?: string;
  children: React.ReactNode;
};

export function InlineMenuDropdown({
  isOpen,
  onToggle,
  onClose,
  onSelect,
  selected,
  toggleLabel,
  toggleAriaLabel,
  toggleClassName,
  menuPlacement = "below",
  className,
  children,
}: InlineMenuDropdownProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  useEffect(() => {
    if (!isOpen) return;

    const onOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target)
      ) {
        onCloseRef.current();
      }
    };

    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [isOpen]);

  const placementClass =
    menuPlacement === "above"
      ? "hb-inline-menu-dropdown--above"
      : "hb-inline-menu-dropdown--below";

  return (
    <div
      ref={wrapperRef}
      className={["hb-inline-menu-dropdown", placementClass, className]
        .filter(Boolean)
        .join(" ")}
    >
      {isOpen ? (
        <Menu
          className="hb-inline-menu-dropdown__menu"
          onSelect={onSelect}
          selected={selected}
        >
          <MenuContent>
            <MenuList>{children}</MenuList>
          </MenuContent>
        </Menu>
      ) : null}
      <MenuToggle
        className={toggleClassName}
        aria-label={toggleAriaLabel}
        onClick={onToggle}
        isExpanded={isOpen}
      >
        {toggleLabel}
      </MenuToggle>
    </div>
  );
}
