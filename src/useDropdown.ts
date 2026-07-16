import { useCallback, useState } from "react";

export function useDropdown(initialOpen = false) {
  const [isOpen, setIsOpen] = useState(initialOpen);

  return {
    isOpen,
    toggle: useCallback(() => setIsOpen((value) => !value), []),
    close: useCallback(() => setIsOpen(false), []),
  };
}
