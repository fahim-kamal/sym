"use client";

import { usePusher } from "@/hooks/usePusher";
import { usePrivateChannel } from "@/hooks/useChannel";
import { useEvent } from "@/hooks/useEvent";
import { useState, useCallback } from "react";

export default function Chat() {
  const channel = usePrivateChannel("private-channel");

  const [messages, setMessages] = useState([]);

  const cb = useCallback((data) => {
    console.count("EVENT BINDED");
    setMessages((prev) => [...prev, data]);
  }, []);

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
          // setInputMessage(event.target.value);
        }}
      />
      <button
        onClick={() => {
          // sendMessage(inputMessage);
        }}
      >
        submit
      </button>
    </>
  );
}
