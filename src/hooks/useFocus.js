import { useState, useEffect } from "react";

export const useFocus = (getNodeToFocus) => {
  const [focus, setFocus] = useState(null);

  const changeFocus = (id, offset = 0) => {
    setFocus({ id, offset });
  };

  useEffect(() => {
    const focusedIdRef = getNodeToFocus(focus?.id);

    if (focus?.id != null && focusedIdRef != undefined) {
      focusedIdRef.focus();
      focusedIdRef.setSelectionRange(focus.offset, focus.offset);
    }
  }, [focus]);

  return { changeFocus };
};
