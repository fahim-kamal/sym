import pusherJs from "pusher-js";
import { useEffect, useState } from "react";

/**
 * @param {pusherJs} pusherClient
 */
function useChannel(pusherClient, channelName) {
  useEffect(() => {
    const canSubscribe =
      pusherClient !== undefined &&
      pusherClient.connection.state === "connected";

    if (canSubscribe) {
      pusherClient.subscribe(channelName);
    }

    return () => {
      if (pusherClient !== undefined) {
        pusherClient.unsubscribe(channelName);
      }
    };
  }, [pusherClient?.connection, channelName]);
}

/**
 * @param {pusherJs} pusherClient
 */
function usePrivateChannel(pusherClient, channelName) {
  const [binded, setBinded] = useState(false);

  useEffect(() => {
    const canSignIn =
      pusherClient !== undefined &&
      pusherClient.connection.state === "connected";

    const signInEvent = "pusher:signin_success";

    const channelCB = () => {
      pusherClient.subscribe(channelName);
    };

    if (canSignIn) {
      pusherClient.signin();

      pusherClient.bind(signInEvent, channelCB);
      setBinded(true);
    }

    return () => {
      if (binded) {
        pusherClient.unbind(signInEvent, channelCB);
        setBinded(false);
      }
    };
  }, [pusherClient?.connection.state, channelName]);
}

export { useChannel, usePrivateChannel };
