"use client";

import { useState } from "react";
import { useControlledInput } from "@/hooks/useControlledInput";
import { useToggle } from "@/hooks/useToggle";

import TextButton from "@/components/textButton";
import GoalBackground from "./goalBackground";
import TabGroup from "@/components/tabGroup";
import { useHeaderContext } from "@/context/headerContext";
import { GoalIcon } from "./goal";
import { useBackgroundContext } from "@/context/goalBackgroundContext";

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

export const gradientVariants = {
  peachy: "from-rose-500 via-pink-500 to-red-500",
  iceberg: "from-blue-500 via-cyan-500 to-teal-500",
  tropicalRainforest: "from-green-500 via-emerald-500 to-teal-500",
};

function GradientBannerSection({ submitGradient }) {
  return (
    <div>
      <div className="flex flex-col gap-y-2">
        {Object.keys(gradientVariants).map((varKey, index) => {
          const style = gradientVariants[varKey];
          const className = `w-full h-[90px] rounded-lg bg-gradient-to-r hover:cursor-pointer ${style}`;

          return (
            <div
              className={className}
              key={index}
              onClick={() => submitGradient(varKey)}
            />
          );
        })}
      </div>
    </div>
  );
}
function ChangeBannerMenu({ submitURL, submitGradient, deleteBackground }) {
  const [selectedSection, setSelectedSection] = useState(0);

  const selectedStyles = "font-bold";
  const applyStyles = (key) => (key == selectedSection ? selectedStyles : "");

  const tabs = ["Gradients", "Link"];

  return (
    <div className="flex flex-col gap-y-2 min-w-[400px] p-4 border bg-white">
      <h3>Backgrounds</h3>
      <div className="flex justify-between items-center">
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
        <div className="hover:cursor-pointer" onClick={deleteBackground}>
          Remove Banner
        </div>
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
  removeBanner,
  handleClose,
}) {
  const submit = (cb, ...params) => {
    resetSelectedTab();
    cb(...params);
    handleClose();
  };

  const submitURL = (input) => submit(setURL, input);
  const submitGradient = (style) => submit(setGradient, style);
  const deleteBackground = () => submit(removeBanner);

  return (
    <div className="relative">
      <ChangeBannerButton onClick={onClick} />
      {isOpen && (
        <div className="absolute right-0">
          <ChangeBannerMenu
            submitURL={submitURL}
            submitGradient={submitGradient}
            deleteBackground={deleteBackground}
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
  const { backgroundData, dispatchBackgroundData } = useBackgroundContext();

  const { value: showBannerTooltips, toggle: toggleShowTooltips } =
    useToggle(false);

  const { value: isRepositionEnabled, toggle: handleBannerReposition } =
    useToggle(false);

  const {
    value: isOpen,
    setValue: setIsOpen,
    toggle: onButtonClick,
  } = useToggle(false);

  const { showBanner, setShowBanner } = useHeaderContext();

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
                    if (backgroundData.content != null) {
                      handleBannerReposition();
                    }
                  }}
                />
                <ChangeBannerBackground
                  isOpen={isOpen}
                  onClick={onButtonClick}
                  setURL={(url) =>
                    dispatchBackgroundData({
                      type: "change",
                      bg_type: "image",
                      bg_content: url,
                    })
                  }
                  setGradient={(style) =>
                    dispatchBackgroundData({
                      type: "change",
                      bg_type: "gradient",
                      bg_content: style,
                    })
                  }
                  removeBanner={() => {
                    setShowBanner(false);
                    dispatchBackgroundData({ type: "delete" });
                  }}
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
            backgroundData={backgroundData}
            isRepositionEnabled={isRepositionEnabled}
          />
        </div>
      )}
      <div className="absolute z-10 -bottom-12 mx-20" id="goalIcon">
        <GoalIcon onIconSelect={() => {}} />
      </div>
    </div>
  );
}
