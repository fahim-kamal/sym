"use client";

import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Overflow from "@/components/overflow";

const sampleChatMessages = [
  {
    id: 12313,
    user: "Fahim Kamal",
    content: "This is a test.",
    date: new Date(),
    side: "left",
  },
  {
    id: 85722,
    user: "Billy Bob",
    content: "Heyoo, whats up with this goal?",
    date: new Date(),
    side: "left",
  },
  {
    id: 34284,
    user: "Billy Bob",
    content: "Ya diggitye.",
    date: new Date(),
    side: "left",
  },
  {
    id: 52848,
    user: "Billy Bob",
    content:
      "I want it to overflow so I can test the oveflow functionality which which will be useful in the design aspect of the chatbox page.",
    date: new Date(),
    side: "left",
  },
  {
    id: 2348242,
    user: "Shelly Seashells",
    content: "Hopefully ",
    date: new Date(),
    side: "left",
  },
  {
    id: 234244,
    user: "blank blank",
    content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque dignissimos quae vitae velit laudantium maiores repellat, omnis inventore id ducimus illo rerum esse necessitatibus error temporibus! Quisquam non dolorem cumque.
  Ab error soluta tenetur, cum aliquam voluptate dicta sunt debitis quod a omnis? Exercitationem sequi praesentium non et. Quisquam maiores cupiditate necessitatibus inventore recusandae illo? Quam sed ex sit qui.`,
    date: new Date(),
    side: "left",
  },
];

function ChatTitle() {
  return <h3>#Untitled Chat</h3>;
}

function ChatMessage({ content, side = "right", userName, chatRef }) {
  const variant = {
    left: "justify-start",
    right: "justify-end",
  };

  return (
    <div className={"flex w-full " + variant[side]} ref={chatRef}>
      <div className={"flex flex-col max-w-[75%]"}>
        <div className="font-medium text-sm">{userName}</div>
        <div className={"bg-sym_bg_gray px-2 py-1 rounded-md"}>{content}</div>
      </div>
    </div>
  );
}

function ChatMessageBox({ messages = [] }) {
  const scrollIntoView = (node) => {
    if (node) {
      node.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col gap-y-2 pr-4 w-[325px]">
      {messages.map(({ content, user, id, side }, idx) => {
        if (idx + 1 === messages.length) {
          return (
            <ChatMessage
              content={content}
              key={id}
              userName={user}
              side={side}
              chatRef={scrollIntoView}
            />
          );
        }

        return (
          <ChatMessage content={content} key={id} userName={user} side={side} />
        );
      })}
    </div>
  );
}

function ChatInput({ addMessage }) {
  const [message, setMessage] = useState("");

  return (
    <textarea
      value={message}
      onChange={(event) => {
        setMessage(event.target.value);
      }}
      onKeyDown={(event) => {
        const trimmed = event.target.value.trim();
        const onlyWhiteSpace = trimmed.length === 0;

        if (event.key === "Enter" && !event.shiftKey && onlyWhiteSpace) {
          event.preventDefault();
        } else if (
          event.key === "Enter" &&
          !event.shiftKey &&
          !onlyWhiteSpace
        ) {
          addMessage(message);
          setMessage("");
          event.preventDefault();
        }
      }}
      rows={3}
      placeholder="Send message"
      className="bg-sym_bg_gray px-2 py-1 rounded-md w-full resize-none"
    />
  );
}

export default function ChatBox() {
  const [messages, setMessages] = useState(sampleChatMessages);

  const addMessage = (messageContent) => {
    setMessages((prev) => {
      return [
        ...prev,
        {
          id: uuidv4(),
          user: "Fahim Kamal",
          content: messageContent,
          date: new Date(),
          side: "right",
        },
      ];
    });
  };

  return (
    <div className="border rounded-xl py-8 overflow-hidden grid grid-rows-[1rem 1fr 1rem] gap-y-2">
      <div className="px-8">
        <ChatTitle />
      </div>
      <div className="overflow-scroll pl-8 ">
        <ChatMessageBox messages={messages} />
      </div>
      <div className="px-8">
        <ChatInput addMessage={addMessage} />
      </div>
    </div>
  );
}
