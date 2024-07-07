"use client";

import { useState, useRef, useContext } from "react";
import Calendar from "./calendar";
import TextButton from "@/components/textButton";
import Note from "./note";
import ChatBox from "./chatBox";
import Overflow from "@/components/overflow";
import EmojiMenu from "../dashboard/emojiMenu";
import GoalBackground from "./goalBackground";

import { HeaderContext, HeaderProvider } from "@/context/headerContext";

function AddRemoveButton({ isEnabled, onButtonClick, text }) {
  const add = "Add " + text;
  const remove = "Remove " + text;

  return (
    <TextButton
      variant="outline"
      onClick={onButtonClick}
      text={isEnabled ? remove : add}
    />
  );
}

function IconSelectionButton() {
  const { isIconEnabled, toggleIsIconEnabled, setShowEmojiMenu } =
    useContext(HeaderContext);

  const onIconButtonClick = () => {
    toggleIsIconEnabled();
    if (!isIconEnabled) {
      setShowEmojiMenu(true);
    }
  };

  return (
    <AddRemoveButton
      text="Icon"
      isEnabled={isIconEnabled}
      onButtonClick={onIconButtonClick}
    />
  );
}

function BannerButton() {
  const { showBanner, setShowBanner } = useContext(HeaderContext);

  const onBannerButtonClick = () => setShowBanner((prev) => !prev);

  return (
    <AddRemoveButton
      text="Banner"
      isEnabled={showBanner}
      onButtonClick={onBannerButtonClick}
    />
  );
}

function DeadlineButton() {
  const [isDeadlineEnabled, setIsDeadlineEnabled] = useState(false);

  const onDeadlineButtonClick = () => setIsDeadlineEnabled((prev) => !prev);

  return (
    <AddRemoveButton
      text="Deadline"
      isEnabled={isDeadlineEnabled}
      onButtonClick={onDeadlineButtonClick}
    />
  );
}

function AddDeadline() {
  return <TextButton text="Add Deadline" variant="outline" />;
}

function GoalButtonRow() {
  return (
    <div className="flex flex-row gap-x-2">
      <IconSelectionButton />
      <BannerButton />
      <DeadlineButton />
    </div>
  );
}

function GoalIcon({ onIconSelect }) {
  const { isIconEnabled, icon, changeIcon, showEmojiMenu, setShowEmojiMenu } =
    useContext(HeaderContext);

  const ref = useRef(null);

  const changeEmojiHandler = ({ native }) => {
    setShowEmojiMenu(false);
    changeIcon(native);
    onIconSelect();
  };

  return (
    <>
      {isIconEnabled && (
        <div ref={ref}>
          <div
            onClick={() => setShowEmojiMenu(true)}
            className="size-24 rounded-xl bg-white flex justify-center items-center border-4 hover:brightness-95 hover:cursor-pointer"
          >
            <div className="text-6xl">{icon}</div>
          </div>
          {showEmojiMenu && (
            <div className="absolute" ref={scrollTo}>
              <EmojiMenu
                changeEmoji={changeEmojiHandler}
                onBlur={() => {
                  setShowEmojiMenu(false);
                }}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

function GoalTitle() {
  const ref = useRef(null);

  return (
    <input
      ref={ref}
      className="outline-none text-2xl font-bold overflow-hidden h-full"
      placeholder="Untitled Goal"
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          ref.current.blur();
        }
      }}
    />
  );
}

export function GoalHeader({ header }) {
  const [showButtomRow, setShowButtonRow] = useState(false);
  const closeButtonRow = () => setShowButtonRow(false);

  return (
    <div
      className="flex flex-col justify-end"
      onMouseEnter={() => {
        setShowButtonRow(true);
      }}
      onMouseLeave={closeButtonRow}
    >
      <HeaderProvider>
        <div className="h-36 relative">
          <GoalBackground />
          {/* <div className="absolute right-0 bottom-0">
            <GoalBackgroundMenu />
          </div> */}
          <div className="size-24 absolute -bottom-12 mx-8">
            <GoalIcon onIconSelect={closeButtonRow} />
          </div>
        </div>
        <div className="mt-10 py-8 px-4 flex flex-col gap-y-2 ">
          <GoalTitle />
          <div className={showButtomRow ? "visible" : "invisible"}>
            <GoalButtonRow closeButtonRow={closeButtonRow} />
          </div>
        </div>
      </HeaderProvider>
    </div>
  );
}

export function GoalBody() {
  return (
    <div className="h-full overflow-hidden flex gap-x-4">
      <Note />
      <ChatBox />
      <div className="p-8 border rounded-xl">
        <Calendar />
      </div>
    </div>
  );
}
