"use client";

import { useRef, useState } from "react";
import { useImgDrag } from "@/hooks/useImgDrag";
import { gradientVariants } from "./goalBanner";

function GoalImageBackground({ src, yPos }) {
  const ref = useRef(null);

  const setDisplay = (visibility) => {
    if (ref.current) {
      ref.current.style.visibility = visibility;
    }
  };

  return (
    <img
      ref={ref}
      onLoad={() => setDisplay("visible")}
      onError={() => setDisplay("hidden")}
      draggable="false"
      src={src}
      style={{
        objectPosition: `center ${yPos}%`,
      }}
      className={`w-full h-[200px] object-cover`}
    />
  );
}

function GoalGradientBackground({ style, yPos }) {
  // ${isRepositionEnabled ? "hover:cursor-move" : ""}
  return (
    <div className={`w-full h-full relative overflow-clip`}>
      <div
        style={{ top: `-${yPos}%` }}
        className={`w-full h-[400px] absolute bg-gradient-to-b ${style}`}
      ></div>
    </div>
  );
}

export default function GoalBackground({
  backgroundData,
  isRepositionEnabled,
}) {
  const { type, content } = backgroundData;

  const [canMove, setCanMove] = useState(false);
  const { yPos, handleDrag, handleDragStart } = useImgDrag();

  return (
    <div
      className="relative w-full h-full"
      onMouseDown={(event) => {
        if (isRepositionEnabled) {
          setCanMove(true);
          handleDragStart(event);
        }
      }}
      onMouseMove={(event) => {
        if (canMove) {
          handleDrag(event);
        }
      }}
      onMouseUp={() => setCanMove(false)}
      onMouseLeave={() => setCanMove(false)}
    >
      {type == "image" ? (
        <GoalImageBackground src={content} yPos={yPos} />
      ) : type == "gradient" ? (
        <GoalGradientBackground style={gradientVariants[content]} yPos={yPos} />
      ) : (
        <></>
      )}
    </div>
  );
}
