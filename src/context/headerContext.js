"use client";

import { useState, createContext, useContext } from "react";

export const HeaderContext = createContext(null);

export function HeaderProvider({ children }) {
  const [isIconEnabled, setIsIconEnabled] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  const toggleIsIconEnabled = () => setIsIconEnabled((prev) => !prev);

  const value = {
    isIconEnabled,
    toggleIsIconEnabled,
    showBanner,
    setShowBanner,
  };
  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
}

export const useHeaderContext = () => {
  const context = useContext(HeaderContext);

  return context;
};
