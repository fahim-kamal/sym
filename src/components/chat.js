"use client";

import { usePusher } from "@/hooks/usePusher";
import { usePrivateChannel } from "@/hooks/useChannel";
import { useState } from "react";

export default function Chat() {
  const client = usePusher();
  const channel = usePrivateChannel(client, "private-channel");

  return (
    <>
      {/* <div>
        {messages.map((data, idx) => {
          return <div key={idx}>{data}</div>;
        })}
      </div> */}
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
