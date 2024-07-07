"use client";

import { TextareaAutosize } from "@mui/base";
import { v4 as uuidv4 } from "uuid";

import { useState, useRef, useEffect } from "react";

import { useBlocks } from "@/hooks/useBlock";
import { useRefList } from "@/hooks/useRefList";

import {
  AddImageButton,
  CreateTableButton,
  CreateTextButton,
} from "@/components/iconButton";
import ChevronLeft from "@/components/icons/chevronLeft";
import ChevronRight from "@/components/icons/chevronRight";
import { TrackMetricButton } from "@/components/iconButton";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

import { Editor } from "../test/page";

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

export function BlockLine({
  content = "",
  renderInputElement,
  blockId,
  previousBlockId,
  blockLineNumber,
  changeBlock,
  setInputRef,
  getRef,
  setFocusByBlockId,
  getBlockByIndex,
}) {
  const [isVisible, setIsVisible] = useState(
    content != "" || blockLineNumber == 1
  );

  const handleInputChange = (event) => {
    changeBlock({
      id: blockId,
      content: event.target.value,
      itemPos: blockLineNumber,
      action: "edit",
    });
  };

  const handleKeyboardEvent = (event) => {
    const offset = event.target.selectionStart;

    const contentBefore = content.slice(0, offset);
    const contentAfter = content.slice(offset);

    // handle enter event
    if (event.key == "Enter" && !event.shiftKey) {
      const createdBlockId = uuidv4();

      changeBlock({
        id: blockId,
        content: contentBefore,
        itemPos: blockLineNumber,
        action: "edit",
      });

      changeBlock({
        id: createdBlockId,
        content: contentAfter,
        itemPos: blockLineNumber,
        action: "add",
      });

      // change focus to the newly created block
      setFocusByBlockId({ id: createdBlockId, offset: 0 });

      // turn visibility off for current block
      if (content == "") {
        setIsVisible(false);
      }

      event.preventDefault();
    }
    // handle delete event
    else if (
      (event.key == "Delete" || event.key == "Backspace") &&
      offset == 0 &&
      blockLineNumber
    ) {
      const prevBlock = getBlockByIndex(blockLineNumber - 1);
      const prevBlockContent = prevBlock?.content;

      changeBlock({
        id: blockId,
        content,
        itemPos: blockLineNumber,
        action: "delete",
      });

      changeBlock({
        id: previousBlockId,
        content: prevBlockContent + contentAfter,
        itemPos: blockLineNumber - 1,
        action: "edit",
      });

      setFocusByBlockId({
        id: previousBlockId,
        offset: prevBlockContent.length ?? 0,
      });

      event.preventDefault();
    }
  };

  const InputElement = renderInputElement({
    blockId: blockId,
    blockLevel: blockLineNumber,
    content: content,
    onChange: handleInputChange,
    onKeyDown: handleKeyboardEvent,
    setInputRef: setInputRef,
    getRef: getRef,
  });

  return (
    <div
      onFocus={() => setIsVisible(true)}
      onBlur={() => {
        if (content == "") {
          setIsVisible(false);
        }
      }}
      className={
        (isVisible ? "[&>div]:opacity-100 " : "[&_textarea]:opacity-0 ") +
        "relative [&_textarea]:hover:opacity-100 [&_svg]:hover:opacity-100 h-full"
      }
    >
      <DragIndicatorIcon
        id="dragIcon"
        className={
          "text-[gray] opacity-0 hover:cursor-grab absolute -left-[2rem]"
        }
      />
      {InputElement}
    </div>
  );
}

export default function Note() {
  return (
    <div className="py-8 border rounded-xl flex-1">
      <div className="flex flex-col justify-between gap-y-4">
        <div className="px-10">
          <NoteHeader />
          <Editor />
        </div>
        <div className="px-8">
          <NoteButtonBar />
        </div>
      </div>
    </div>
  );
}
