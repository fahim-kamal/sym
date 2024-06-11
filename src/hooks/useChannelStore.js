import { useCache } from "./useCache";

import { useContext } from "react";
import { PusherContext } from "@/context/pusherContext";

export const useChannelStore = () => {
  const { channelCache, setChannelCache } = useContext(PusherContext);

  const {
    getFromCache: getChannel,
    addToCache: addChannel,
    removeFromCache: deleteChannel,
  } = useCache(channelCache, setChannelCache);

  return { getChannel, addChannel, deleteChannel };
};
