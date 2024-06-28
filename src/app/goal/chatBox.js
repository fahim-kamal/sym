"use client";

import { useShrinkwrap } from "@/hooks/useShrinkwrap";

const sampleChatMessages = [
  {
    id: 12313,
    user: "Fahim Kamal",
    content: "This is the the content of the message.",
    date: new Date(),
  },
  {
    id: 85722,
    user: "Billy Bob",
    content: "Heyoo, whats up with this goal?",
    date: new Date(),
  },
  {
    id: 34284,
    user: "Billy Bob",
    content: "I am trying to implement some antidisestablishmentarianism here.",
    date: new Date(),
  },
  {
    id: 52848,
    user: "Billy Bob",
    content:
      "I want it to overflow so I can test the oveflow functionality which which will be useful in the design aspect of the chatbox page.",
    date: new Date(),
  },
];

function ChatTitle() {
  return <h3>#Untitled Chat</h3>;
}

function ChatMessage({ content, side = "right", author, messageRefCb }) {
  const variant = {
    left: "justify-start",
    right: "justify-end",
  };

  return (
    <div className={"flex flex-row w-full " + variant[side]}>
      <div className="flex flex-col">
        <div className="font-medium text-sm">test</div>
        <div
          className={"bg-sym_bg_gray px-2 py-1 rounded-md"}
          ref={messageRefCb}
        >
          {content}
        </div>
      </div>
    </div>
  );
}

function ChatMessageBox({ messages = [] }) {
  const { ref } = useShrinkwrap();

  return (
    <div className="flex flex-col gap-y-2 w-[325px]">
      {messages.map(({ content, id }) => (
        <ChatMessage
          content={content}
          key={id}
          side="left"
          messageRefCb={ref}
        />
      ))}
    </div>
  );
}

export default function ChatBox() {
  return (
    <div className="border rounded-xl p-8">
      <ChatTitle />
      <div>testing</div>
      <ChatMessageBox messages={sampleChatMessages} />
    </div>
  );
}
