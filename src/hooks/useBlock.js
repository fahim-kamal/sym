import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export const useBlocks = (initialBlocks = [{ id: uuidv4(), content: "" }]) => {
  const [blocks, setBlocks] = useState(initialBlocks);

  const editBlocks = ({ id, content, itemPos, action = "edit" }) => {
    setBlocks((prev) => {
      const element = { id, content };

      switch (action) {
        case "edit":
          return [
            ...prev.slice(0, itemPos),
            element,
            ...prev.slice(itemPos + 1),
          ];
        case "add":
          return [
            ...prev.slice(0, itemPos + 1),
            element,
            ...prev.slice(itemPos + 1),
          ];
        case "delete":
          if (itemPos == 0) return prev;

          return [...prev.slice(0, itemPos), ...prev.slice(itemPos + 1)];
      }
    });
  };

  const getBlockByIndex = (index) => {
    return blocks[index];
  };

  return { blocks, editBlocks, setBlocks, getBlockByIndex };
};
