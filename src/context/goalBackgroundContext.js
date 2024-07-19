import { createContext, useState, useReducer, useContext } from "react";

const defaultBackground = { type: "gradient", content: "peachy" };

function backgroundReducer(state, action) {
  switch (action.type) {
    case "add":
      return { ...defaultBackground };
    case "change":
      return { type: action.bg_type, content: action.bg_content };
    case "delete":
      return { type: null, content: null };
  }
}

const BackgroundContext = createContext(null);

export default function BackgroundProvider({ children }) {
  const [backgroundData, dispatchBackgroundData] = useReducer(
    backgroundReducer,
    defaultBackground
  );

  return (
    <BackgroundContext.Provider
      value={{ backgroundData, dispatchBackgroundData }}
    >
      {children}
    </BackgroundContext.Provider>
  );
}

export const useBackgroundContext = () => {
  const context = useContext(BackgroundContext);

  return context;
};
