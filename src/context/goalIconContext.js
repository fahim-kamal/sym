import { useState, createContext, useContext } from "react";

const GoalIconContext = createContext(null);

export function GoalIconProvider({ children }) {
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);
  const [icon, setIcon] = useState("");

  return (
    <GoalIconContext.Provider
      value={{ showEmojiMenu, setShowEmojiMenu, icon, changeIcon: setIcon }}
    >
      {children}
    </GoalIconContext.Provider>
  );
}

export const useGoalIconContext = () => {
  const value = useContext(GoalIconContext);

  return value;
};
