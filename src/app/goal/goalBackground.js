"use client";

import { useContext } from "react";
import { HeaderContext } from "@/context/headerContext";

import Image from "next/image";

export function GoalImageBackground({ src, children }) {
  return (
    <div className="w-full h-full">
      <img
        className="w-full h-full object-cover"
        src="https://images.unsplash.com/photo-1548506923-99f6e89852fe?q=80&w=2948&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      {children}
    </div>
  );
}

export function GoalGradientBackground({ styles, children }) {
  return (
    <div className="w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
      {children}
    </div>
  );
}

export default function GoalBackground({ type = "image", children }) {
  const { showBanner } = useContext(HeaderContext);

  if (!showBanner) {
    return <></>;
  }

  return (
    <>
      {type == "image" ? (
        <GoalImageBackground>{children}</GoalImageBackground>
      ) : (
        <GoalGradientBackground>{children}</GoalGradientBackground>
      )}
    </>
  );
}
