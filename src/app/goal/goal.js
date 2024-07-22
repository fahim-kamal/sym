"use client";

import { useState, useRef, useContext } from "react";
import Calendar from "./calendar";
import TextButton from "@/components/textButton";
import Note from "./note";
import ChatBox from "./chatBox";
import EmojiMenu from "../dashboard/emojiMenu";

import { HeaderContext, HeaderProvider } from "@/context/headerContext";
import GoalBanner from "./goalBanner";
import {
  GoalIconProvider,
  useGoalIconContext,
} from "@/context/goalIconContext";
import BackgroundProvider, {
  useBackgroundContext,
} from "@/context/goalBackgroundContext";

function AddRemoveButton({ isEnabled, onButtonClick, text }) {
  const add = "Add ";

  return (
    <>
      {!isEnabled && (
        <TextButton
          variant="outline"
          onClick={onButtonClick}
          text={add + text}
        />
      )}
    </>
  );
}

function IconSelectionButton() {
  const { setShowEmojiMenu } = useGoalIconContext();
  const { isIconEnabled, toggleIsIconEnabled } = useContext(HeaderContext);

  const onIconButtonClick = () => {
    toggleIsIconEnabled();
    setShowEmojiMenu(true);
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
  const { dispatchBackgroundData } = useBackgroundContext();

  const onBannerButtonClick = () => {
    dispatchBackgroundData({ type: "add" });
    setShowBanner((prev) => !prev);
  };

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

function RemoveIcon({ onClick }) {
  return (
    <div className="p-2 border rounded-xl border-solid border-gray hover:cursor-pointer">
      <div onClick={onClick} className="text-sm">
        Remove Icon
      </div>
    </div>
  );
}

export function GoalIcon({ onIconSelect }) {
  const { showEmojiMenu, setShowEmojiMenu, icon, changeIcon } =
    useGoalIconContext();
  const { isIconEnabled, toggleIsIconEnabled } = useContext(HeaderContext);

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
            <div className="absolute z-20" ref={scrollTo}>
              <EmojiMenu
                changeEmoji={changeEmojiHandler}
                onBlur={() => {
                  setShowEmojiMenu(false);
                }}
              />
              <div className="top-0 right-0 absolute translate-x-full">
                <RemoveIcon
                  onClick={() => {
                    // setShowEmojiMenu(false);
                    toggleIsIconEnabled();
                  }}
                />
              </div>
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

export function GoalHeader() {
  const [showButtomRow, setShowButtonRow] = useState(false);
  const closeButtonRow = () => setShowButtonRow(false);

  return (
    <HeaderProvider>
      <GoalIconProvider>
        <BackgroundProvider>
          <div className="flex flex-col justify-end">
            <GoalBanner />
            <div
              onMouseEnter={() => {
                setShowButtonRow(true);
              }}
              onMouseLeave={closeButtonRow}
              className="mt-10 py-8 px-4 flex flex-col gap-y-2 "
            >
              <GoalTitle />
              <div className={showButtomRow ? "visible" : "invisible"}>
                <GoalButtonRow closeButtonRow={closeButtonRow} />
              </div>
            </div>
          </div>
        </BackgroundProvider>
      </GoalIconProvider>
    </HeaderProvider>
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
