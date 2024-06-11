"use client";

import { createContext, useState } from "react";
import { useChannelStore } from "@/hooks/useChannelStore";

export const PusherContext = createContext(null);

export const PusherProvider = ({ children }) => {
  const [pusherClient, setPusherClient] = useState();
  const [channelCache, setChannelCache] = useState();

  const value = {
    pusherClient,
    setPusherClient,
    channelCache,
    setChannelCache,
  };

  return (
    <PusherContext.Provider value={value}>{children}</PusherContext.Provider>
  );
};
