import { useCallback } from "react";

export const useShrinkwrap = () => {
  const ref = useCallback((node) => {
    if (node) {
      const { firstChild, lastChild } = node;
      const range = document.createRange();
      range.setStartBefore(firstChild);
      range.setEndAfter(lastChild);
      const { width } = range.getBoundingClientRect();
      node.style.width = width + 1 + "px";
      node.style.boxSizing = "content-box";
    }
  }, []);

  return { ref: ref };
};
