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

import { Editor } from "./editor";

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
