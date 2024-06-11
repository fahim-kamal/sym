import { useState } from "react";

export const useCache = (state, setState) => {
  const addToCache = (key, value) => {
    setState((prev) => {
      if (prev?.[key] === undefined) {
        return { ...prev, [key]: value };
      } else return prev;
    });
  };

  const removeFromCache = (key) => {
    setState((prev) => {
      const copy = { ...prev };

      if (copy?.[key] !== undefined) {
        delete copy[key];
      }

      return copy;
    });
  };

  const getFromCache = (key) => {
    return state?.[key];
  };

  return { addToCache, removeFromCache, getFromCache };
};
