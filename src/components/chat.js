"use client";

import { usePrivateChannel } from "@/hooks/useChannel";
import { useEvent } from "@/hooks/useEvent";
import { useState, useCallback } from "react";

export default function Chat() {
  const channel = usePrivateChannel("private-channel");

  const [messages, setMessages] = useState([]);
  const [current, setCurrent] = useState("");

  const cb = useCallback((data) => {
    setMessages((prev) => [...prev, data]);
  }, []);

  const sendMessage = useCallback(() => {
    if (channel) {
      channel.trigger("client-chat", current);
    }
  }, [channel]);

  useEvent(channel, "chat", cb);

  return (
    <>
      <div>
        {messages.map((data, idx) => {
          return <div key={idx}>{data}</div>;
        })}
      </div>
      <input
        className="border-2"
        onChange={(event) => {
          setCurrent(event.target.value);
        }}
      />
      <button
        onClick={() => {
          sendMessage();
          setMessages((prev) => [...prev, current]);
        }}
      >
        submit
      </button>
    </>
  );
}
