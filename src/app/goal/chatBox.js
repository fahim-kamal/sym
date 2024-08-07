"use client";

import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Overflow from "@/components/overflow";

const sampleChatMessages = [
  {
    id: 12313,
    user: "Fahim Kamal",
    content: "This is a test.",
    date: new Date(2024, 6, 4),
    side: "left",
  },
  {
    id: 85722,
    user: "Billy Bob",
    content: "Heyoo, whats up with this goal?",
    date: new Date(2024, 6, 15),
    side: "left",
  },
  {
    id: 34284,
    user: "Billy Bob",
    content: "Ya diggitye.",
    date: new Date(2024, 6, 18),
    side: "left",
  },
  {
    id: 52848,
    user: "Billy Bob",
    content:
      "I want it to overflow so I can test the oveflow functionality which which will be useful in the design aspect of the chatbox page.",
    date: new Date(2024, 6, 18),
    side: "left",
  },
  {
    id: 2348242,
    user: "Shelly Seashells",
    content: "Hopefully ",
    date: new Date(2024, 6, 20),
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

function ChatMessage({
  content,
  date,
  showUsername = true,
  side = "right",
  userName,
  chatRef,
}) {
  const variant = {
    left: "justify-start",
    right: "justify-end",
  };

  return (
    <div className="flex flex-col gap-y-2" ref={chatRef}>
      {date !== undefined && (
        <div
          className="self-center font-medium text-sm mt-4"
          suppressHydrationWarning
        >
          {date}
        </div>
      )}
      <div className={"flex w-full " + variant[side]}>
        <div className={"flex flex-col max-w-[75%]"}>
          {showUsername && (
            <div className="font-medium text-sm">{userName}</div>
          )}
          <div className={"bg-sym_bg_gray px-2 py-1 rounded-md"}>{content}</div>
        </div>
      </div>
    </div>
  );
}

const formatChatMessageDate = (date) => {
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const weekAgo = new Date();
  weekAgo.setDate(today.getDate() - 7);

  const messageDateString = date.toDateString();

  const isToday = messageDateString === today.toDateString();
  const isYesterday = messageDateString === yesterday.toDateString();
  const isWithinLastWeek = date.getTime() >= weekAgo.getTime();

  // if date is today or yesterday say so
  if (isToday) {
    return "Today at " + date.toLocaleString([], { timeStyle: "short" });
  } else if (isYesterday) {
    return "Yesterday at " + date.toLocaleString([], { timeStyle: "short" });
  }
  // if date is in the last week use day of week
  else if (isWithinLastWeek) {
    const dateString = date.toLocaleString([], {
      weekday: "long",
      hour: "numeric",
      minute: "numeric",
    });

    const split = dateString.split(" ");

    return split[0] + " at " + split.splice(1).join(" ");
  }
  // other wise use full name

  const time = date.toLocaleString([], {
    dateStyle: "long",
    timeStyle: "short",
  });

  return time;
};

function ChatMessageBox({ lastMessageRef, messages = [] }) {
  return (
    <div className="flex flex-col gap-y-2 pr-4">
      {messages.map(({ content, date, user, id, side }, idx, array) => {
        const prev = array?.[idx - 1];
        const prevDate = prev?.date;

        const isSameDay =
          prevDate && prevDate.toDateString() === date.toDateString();

        const prevName = prev?.user;
        const showUsername = prevName !== user || !isSameDay;

        return (
          <ChatMessage
            date={isSameDay ? undefined : formatChatMessageDate(date)}
            content={content}
            showUsername={showUsername}
            key={id}
            userName={user}
            side={side}
            chatRef={idx + 1 === messages.length ? lastMessageRef : undefined}
          />
        );
      })}
    </div>
  );
}

function ChatInput({ addMessage, onTextSelect }) {
  const [message, setMessage] = useState("");

  return (
    <textarea
      value={message}
      onChange={(event) => {
        setMessage(event.target.value);
      }}
      onSelect={onTextSelect}
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
      className="bg-sym_bg_gray px-2 py-1 rounded-md w-full resize-none outline-none"
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

  const lastMessageRef = useRef(null);

  const inputSelectHandler = () => {
    if (lastMessageRef.current !== null) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  };

  return (
    <div className="border rounded-xl py-8 overflow-hidden flex flex-col max-w-[400px] h-[500px]">
      <div className="px-8 py-2">
        <ChatTitle />
      </div>
      <div className="overflow-scroll pl-8 flex-auto flex flex-col-reverse">
        <ChatMessageBox lastMessageRef={lastMessageRef} messages={messages} />
      </div>
      <div className="px-8">
        <ChatInput addMessage={addMessage} onTextSelect={inputSelectHandler} />
      </div>
    </div>
  );
}
