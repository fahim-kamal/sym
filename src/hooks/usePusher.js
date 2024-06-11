import Pusher from "pusher-js";
import {
  pusherAuthenticateEndpoint,
  pusherAuthorizeEndpoint,
} from "@/lib/pusher";
import { useEffect, useState } from "react";

export const usePusher = () => {
  const [connection, setConnection] = useState();

  useEffect(() => {
    const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      enabledTransports: ["ws"],
      authEndpoint: pusherAuthorizeEndpoint,
      authTransport: "ajax",
      userAuthentication: {
        endpoint: pusherAuthenticateEndpoint,
      },
      forceTLS: true,
    });

    const connectionCallback = () => {
      setConnection(pusherClient);
    };

    pusherClient.connection.bind("connected", connectionCallback);

    return () => {
      pusherClient.disconnect();
      pusherClient.connection.unbind("connected", connectionCallback);
      setConnection(null);
    };
  }, []);

  return connection;
};
