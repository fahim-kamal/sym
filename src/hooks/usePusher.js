import Pusher from "pusher-js";
import {
  pusherAuthenticateEndpoint,
  pusherAuthorizeEndpoint,
} from "@/lib/pusher";
import { useState, useRef, useEffect } from "react";

const options = {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
  enabledTransports: ["ws"],
  authEndpoint: pusherAuthorizeEndpoint,
  authTransport: "ajax",
  userAuthentication: {
    endpoint: pusherAuthenticateEndpoint,
  },
  forceTLS: true,
};

const testingChannelId = "testing";

export const usePusher = (channelId = testingChannelId) => {
  const [messages, setMessages] = useState([]);
  const pusherClientRef = useRef(null);
  const [isConnectionLoading, setIsConnectionLoading] = useState(true);

  const channelName = `private-${channelId}`;
  const messageEventName = "client-message-event";

  const updateMessageList = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const sendMessage = (message) => {
    const channel = pusherClientRef.current.get(channelName);
    channel.trigger(messageEventName, message);
  };

  const submitHandler = (message) => {
    updateMessageList(message);
    sendMessage(message);
  };

  useEffect(() => {
    if (pusherClientRef.current === null) {
      const map = new Map();

      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, options);
      const channel = pusher.subscribe(channelName);

      channel.bind("pusher:subscription_succeeded", () => {
        setIsConnectionLoading(false);
      });

      channel.bind(messageEventName, (data) => {
        updateMessageList(data);
      });

      map.set("pusher", pusher);
      map.set(channelName, channel);

      pusherClientRef.current = map;
    }
  }, []);

  return { isLoading: isConnectionLoading, submitHandler, messages };
};
