"use client";

import { useState } from "react";
import { useControlledInput } from "@/hooks/useControlledInput";
import { useToggle } from "@/hooks/useToggle";

import TextButton from "@/components/textButton";
import GoalBackground from "./goalBackground";
import TabGroup from "@/components/tabGroup";
import { useHeaderContext } from "@/context/headerContext";
import { GoalIconProvider } from "@/context/goalIconContext";
import { GoalIcon } from "./goal";

function LinkBannerSection({ submitURL }) {
  const { input, onInputChange } = useControlledInput();

  return (
    <div className="flex flex-col gap-y-2">
      <input
        placeholder="Enter an image link..."
        value={input}
        onChange={onInputChange}
        className="outline-none"
      />
      <TextButton
        text="Submit"
        variant="solid"
        onClick={() => submitURL(input)}
      />
    </div>
  );
}

function GradientBannerSection({ submitGradient }) {
  const variants = [
    "from-rose-500 via-pink-500 to-red-500",
    "from-blue-500 via-cyan-500 to-teal-500",
    "from-green-200 via-emerald-400 to-teal-600",
  ];

  return (
    <div>
      <div className="flex flex-col gap-y-2">
        {variants.map((style, index) => {
          const className = `w-full h-[90px] rounded-lg bg-gradient-to-r hover:cursor-pointer ${style}`;

          return (
            <div
              className={className}
              key={index}
              onClick={() => submitGradient(style)}
            />
          );
        })}
      </div>
    </div>
  );
}

function ChangeBannerMenu({ submitURL, submitGradient }) {
  const [selectedSection, setSelectedSection] = useState(0);

  const selectedStyles = "font-bold";
  const applyStyles = (key) => (key == selectedSection ? selectedStyles : "");

  const tabs = ["Gradients", "Link"];

  return (
    <div className="flex flex-col gap-y-2 min-w-[400px] p-4 border bg-white">
      <h3>Backgrounds</h3>
      <div className="flex gap-x-2 hover:[&>div]:cursor-pointer">
        {tabs.map((tab, index) => (
          <div
            className={applyStyles(index)}
            onClick={() => setSelectedSection(index)}
            key={index}
          >
            {tab}
          </div>
        ))}
      </div>
      {selectedSection == 0 ? (
        <GradientBannerSection submitGradient={submitGradient} />
      ) : (
        <LinkBannerSection submitURL={submitURL} />
      )}
    </div>
  );
}

function ChangeBannerButton({ onClick }) {
  const text = "Change Banner";
  return <TextButton text={text} variant="solid" onClick={onClick} />;
}

function ChangeBannerBackground({
  isOpen,
  onClick,
  resetSelectedTab,
  setURL,
  setGradient,
  handleClose,
}) {
  const submit = (cb, content) => {
    resetSelectedTab();
    cb(content);
    handleClose();
  };

  const submitURL = (input) => submit(setURL, input);
  const submitGradient = (style) => submit(setGradient, style);

  return (
    <div className="relative">
      <ChangeBannerButton onClick={onClick} />
      {isOpen && (
        <div className="absolute right-0">
          <ChangeBannerMenu
            submitURL={submitURL}
            submitGradient={submitGradient}
          />
        </div>
      )}
    </div>
  );
}

function GoalRepositionToolTip() {
  const text = "Drag to reposition";
  return (
    <div className="px-2 py-1 bg-black/50 text-white text-sm rounded-sm select-none hover:cursor-move">
      {text}
    </div>
  );
}

function BannerReposition({ isEnabled, onClick }) {
  const enableText = "Reposition";
  const confirmText = "Confirm";

  return (
    <TextButton
      text={isEnabled ? confirmText : enableText}
      variant="solid"
      onClick={onClick}
    />
  );
}

export default function GoalBanner() {
  const [background, setBackground] = useState({ type: null, content: null });

  const setBackgroundData = ({ type, content }) =>
    setBackground({ type, content });

  const { value: showBannerTooltips, toggle: toggleShowTooltips } =
    useToggle(false);

  const { value: isRepositionEnabled, toggle: handleBannerReposition } =
    useToggle(false);

  const {
    value: isOpen,
    setValue: setIsOpen,
    toggle: onButtonClick,
  } = useToggle(false);

  const { showBanner } = useHeaderContext();

  return (
    <div className="w-full h-[200px] relative">
      {showBanner && (
        <div
          className={
            "w-full h-full" +
            ` ${showBannerTooltips ? "[&>div]:block" : "[&>div]:hover:block"}` +
            ` ${isRepositionEnabled ? "cursor-move" : ""}`
          }
        >
          <div className="absolute z-10 hidden top-4 right-4">
            <div className="flex gap-x-2">
              <TabGroup after={toggleShowTooltips}>
                <BannerReposition
                  isEnabled={isRepositionEnabled}
                  onClick={() => {
                    if (background.content != null) {
                      handleBannerReposition();
                    }
                  }}
                />
                <ChangeBannerBackground
                  isOpen={isOpen}
                  onClick={onButtonClick}
                  setURL={(url) =>
                    setBackgroundData({ type: "image", content: url })
                  }
                  setGradient={(style) =>
                    setBackgroundData({ type: "gradient", content: style })
                  }
                  handleClose={() => {
                    setIsOpen(false);
                    toggleShowTooltips();
                  }}
                />
              </TabGroup>
            </div>
          </div>
          <div
            className={
              "absolute z-10 left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" +
              ` ${isRepositionEnabled ? "" : "!hidden"}`
            }
          >
            <GoalRepositionToolTip />
          </div>
          <GoalBackground
            backgroundData={background}
            isRepositionEnabled={isRepositionEnabled}
          />
        </div>
      )}
      <div className="absolute z-10 -bottom-12 mx-8" id="goalIcon">
        <GoalIconProvider>
          <GoalIcon onIconSelect={() => {}} />
        </GoalIconProvider>
      </div>
    </div>
  );
}
