"use client";

import { useState, createContext } from "react";

export const HeaderContext = createContext(null);

export const HeaderProvider = ({ children }) => {
  const [isIconEnabled, setIsIconEnabled] = useState(false);
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);
  const [icon, setIcon] = useState("");

  const [showBanner, setShowBanner] = useState(false);

  const changeIcon = (icon) => setIcon(icon);

  const toggleIsIconEnabled = () => setIsIconEnabled((prev) => !prev);

  const value = {
    changeIcon,
    icon,
    isIconEnabled,
    toggleIsIconEnabled,
    showEmojiMenu,
    setShowEmojiMenu,
    showBanner,
    setShowBanner,
  };
  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
};
