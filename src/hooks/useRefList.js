import { useRef } from "react";

export const useRefList = (setCallback = (node) => {}) => {
  const refList = useRef(null);

  const getRefMap = () => {
    if (!refList.current) {
      refList.current = new Map();
    }
    return refList.current;
  };

  const setRef = (node, id) => {
    const refMap = getRefMap();

    if (node) {
      refMap.set(id, node);
      setCallback(node, id);
    } else {
      refMap.delete(id);
    }
  };

  const getRefById = (id) => {
    return getRefMap().get(id);
  };

  return { getRefMap, getRefById, setRef };
};
