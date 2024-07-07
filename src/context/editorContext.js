import { createContext } from "react";

import { useFocus } from "@/hooks/useFocus";
import { useRefList } from "@/hooks/useRefList";

export const EditorContext = createContext(null);

export function EditorProvider({ children }) {
  const { setRef, getRefById, getRefMap } = useRefList();
  const { changeFocus } = useFocus(getRefById);

  const value = {
    setRef,
    getRefById,
    changeFocus,
  };

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}
