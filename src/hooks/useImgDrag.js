import { useState } from "react";

const clamp = (min, max, num) => {
  return Math.max(min, Math.min(max, num));
};

const extractCoordinates = (event) => {
  const { pageX: x, pageY: y } = event;

  return [x, y];
};

export const useImgDrag = () => {
  const [yPos, setYPos] = useState(0);
  const [yClickPosition, setYClickPosition] = useState(null);

  const handleDragStart = (event) => {
    const [x, y] = extractCoordinates(event);
    setYClickPosition(y);
  };

  const handleDrag = (event) => {
    const [x, y] = extractCoordinates(event);

    setYPos((prev) => {
      const offset = (yClickPosition - y) / 8;

      return clamp(0, 100, prev + offset);
    });

    setYClickPosition(y);
  };

  return { yPos, handleDragStart, handleDrag };
};
