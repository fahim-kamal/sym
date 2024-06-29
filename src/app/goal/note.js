"use client";

import { TextareaAutosize } from "@mui/base";
import { v4 as uuidv4 } from "uuid";

import { useState, useRef } from "react";

import {
  AddImageButton,
  CreateTableButton,
  CreateTextButton,
} from "@/components/iconButton";
import ChevronLeft from "@/components/icons/chevronLeft";
import ChevronRight from "@/components/icons/chevronRight";
import { TrackMetricButton } from "@/components/iconButton";

function NoteHeader() {
  const today = new Date().toDateString();
  const split = today.split(" ", 3).join(" ");

  return (
    <div className="flex flex-row justify-between">
      <h3>{split}</h3>
      <div className="flex flex-row">
        <ChevronLeft />
        <ChevronRight />
      </div>
    </div>
  );
}

function NoteButtonBar() {
  return (
    <div className="flex flex-row gap-x-2">
      <AddImageButton />
      <TrackMetricButton />
      <CreateTableButton />
    </div>
  );
}

function AddNotePrompt({ ref }) {
  const initialPrompt = "Write something here";
  const [content, setContent] = useState("");

  return (
    <TextareaAutosize
      className="outline-none w-full resize-none scroll-auto h-full"
      value={content}
      placeholder={initialPrompt}
      onChange={(event) => {
        setContent(event.target.value);
      }}
      onBlur={() => {
        const trimmed = content.trim();
        const isEmpty = trimmed.length === 0;

        if (isEmpty) {
          setContent("");
        }
      }}
    />
  );
}

function NoteCanvas() {
  const [elements, setElements] = useState({});

  const addElement = (type) => {
    setElements((prev) => {
      return { ...prev, [uuidv4]: { type: type, content: "" } };
    });
  };

  return (
    <div className="h-full overflow-scroll px-8">
      <AddNotePrompt />
      <div className="pt-4">
        <img src="https://roseodengo.com/wp-content/uploads/2017/02/online-community.jpg" />
      </div>
    </div>
  );
}

export default function Note() {
  return (
    <div className="py-8 border rounded-xl flex-1">
      <div className="flex flex-col justify-between gap-y-4 h-full">
        <div className="px-8">
          <NoteHeader />
        </div>
        <NoteCanvas />
        <div className="px-8">
          <NoteButtonBar />
        </div>
      </div>
    </div>
  );
}
