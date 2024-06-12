import Pusher from "pusher-js";
import {
  pusherAuthenticateEndpoint,
  pusherAuthorizeEndpoint,
} from "@/lib/pusher";
import { useContext, useEffect } from "react";
import { PusherContext } from "@/context/pusherContext";

export const usePusher = () => {
  const { pusherClient, setPusherClient } = useContext(PusherContext);

  useEffect(() => {
    if (pusherClient === undefined) {
      const pusherInstance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
        enabledTransports: ["ws"],
        authEndpoint: pusherAuthorizeEndpoint,
        authTransport: "ajax",
        userAuthentication: {
          endpoint: pusherAuthenticateEndpoint,
        },
        forceTLS: true,
      });

      const clientCallback = () => {
        setPusherClient(pusherInstance);
      };

      const disconnectCallback = () => {
        setPusherClient(undefined);
      };

      pusherInstance.connection.bind("connected", clientCallback);
      pusherInstance.connection.bind("disconnected", disconnectCallback);
    }

    return () => {
      if (pusherClient !== undefined) {
        pusherClient.disconnect();
        pusherClient.connection.unbind("connected", clientCallback);
        pusherClient.connection.unbind("disconnected", disconnectCallback);
        setPusherClient(undefined);
      }
    };
  }, []);

  return { pusherClient };
};
