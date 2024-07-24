"use client";

import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

export default function EmojiMenu({ changeEmoji, onBlur }) {
  return (
    <div className="emoji-menu">
      <Picker
        data={data}
        previewPosition="none"
        // searchPosition="none"
        theme="light"
        onEmojiSelect={changeEmoji}
        onClickOutside={onBlur}
      />
    </div>
  );
}
