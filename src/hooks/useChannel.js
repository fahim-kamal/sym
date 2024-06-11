import { useEffect, useState } from "react";

import { usePusher } from "./usePusher";
import { useChannelStore } from "./useChannelStore";

function usePrivateChannel(channelName) {
  const { pusherClient } = usePusher();
  const { addChannel, removeChannel, getChannel } = useChannelStore();

  const [binded, setBinded] = useState(false);

  useEffect(() => {
    const channelCallback = () => {
      addChannel(channelName, pusherClient.subscribe(channelName));
    };

    const signInEvent = "pusher:signin_success";

    if (getChannel(channelName) === undefined) {
      const canSignIn =
        pusherClient !== undefined &&
        pusherClient.connection.state === "connected";

      if (canSignIn) {
        pusherClient.signin();
        pusherClient.bind(signInEvent, channelCallback);
        setBinded(true);
      }
    }

    return () => {
      if (binded) {
        pusherClient.unbind(signInEvent, channelCallback);
        pusherClient.unsubscribe(channelName);
        setBinded(false);
        removeChannel(channelName);
      }
    };
  }, [pusherClient?.connection.state, channelName]);

  return getChannel(channelName);
}

export { usePrivateChannel };
