"use client";

import { AddImageButton, CreateTableButton } from "@/components/iconButton";
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

export default function Note() {
  return (
    <div className="p-8 border rounded-xl flex-1">
      <div className="flex flex-col justify-between h-full">
        <div>
          <NoteHeader />
          <div>Document daily progress here</div>
        </div>
        <NoteButtonBar />
      </div>
    </div>
  );
}
