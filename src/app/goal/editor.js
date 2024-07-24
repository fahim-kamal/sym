"use client";

import Stack from "@/components/stack";
import TextareaAutosize from "react-textarea-autosize";
import DragIndicator from "@mui/icons-material/DragIndicator";

import { useState, useEffect, useContext } from "react";
import { flushSync } from "react-dom";
import { useBlocks } from "@/hooks/useBlock";
import { useRefList } from "@/hooks/useRefList";

import { EditorContext, EditorProvider } from "@/context/editorContext";

import { v4 as uuidv4 } from "uuid";

function ConnectedInputField({
  placeholder,
  blockId,
  blockLevel,
  content,
  onChange,
  onKeyDown,
  onTextClick,
  disableInput,
  setInputRef,
  getRef,
}) {
  const handleTextClick = () => {
    onTextClick(false);

    const selection = window.getSelection();
    const ref = getRef(blockId);

    const isSelectionEmpty = !selection.toString().length;

    if (ref != null && isSelectionEmpty) {
      const { anchorOffset } = selection;

      ref.focus();
      ref.setSelectionRange(anchorOffset, anchorOffset);
    }
  };

  const contentIsEmpty = content.length == 0;

  return (
    <Stack>
      <TextareaAutosize
        value={content}
        placeholder={placeholder}
        onChange={onChange}
        onKeyDown={onKeyDown}
        ref={(node) => setInputRef(node, blockId)}
        className={
          "text-base caret-black outline-none resize-none selection:bg-cyan-400 placeholder:text-transparent focus:placeholder:text-gray-400 " +
          (disableInput ? "invisible" : "text-transparent")
        }
      />
      <div
        className={
          "text-base hover:cursor-text break-words whitespace-pre-wrap select-text "
        }
        onMouseDown={(event) => {
          if (event.detail > 2 || (event.detail > 1 && content == "")) {
            event.preventDefault();
          }
        }}
        onClick={handleTextClick}
        ref={(node) => {
          setInputRef(node, blockId + "-overlay");

          if (node) {
            node.setAttribute("blockLevel", blockLevel);

            node.addEventListener("selectstart", () => {
              onTextClick(true);
            });
          }
        }}
      >
        {!contentIsEmpty ? content : " "}
      </div>
    </Stack>
  );
}

function BlockLine({
  content = "",
  renderInputElement,
  blockId,
  previousBlockId,
  blockLineNumber,
  changeBlock,
  getBlockByIndex,
}) {
  const { setRef, getRefById, changeFocus } = useContext(EditorContext);

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
      changeFocus(createdBlockId, 0);

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

      changeFocus(previousBlockId, prevBlockContent.length ?? 0);

      event.preventDefault();
    }
  };

  const InputElement = renderInputElement({
    blockId: blockId,
    blockLevel: blockLineNumber,
    content: content,
    onChange: handleInputChange,
    onKeyDown: handleKeyboardEvent,
    setInputRef: setRef,
    getRef: getRefById,
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
      <DragIndicator
        id="dragIcon"
        className={
          "text-[gray] opacity-0 hover:cursor-grab absolute -left-[2rem]"
        }
      />
      {InputElement}
    </div>
  );
}

function EditorCanvas({
  children,
  blocks,
  editBlocks,
  setBlocks,
  onTextClick,
}) {
  const { getRefById } = useContext(EditorContext);

  // probably should extract to a hooks
  const getAssociatedId = (node) => {
    return node.getAttribute("blockLevel");
  };

  const determineSelectionDirection = (
    selection,
    anchorBlockLevel,
    focusBlockLevel
  ) => {
    const { anchorNode, focusNode, anchorOffset, focusOffset } = selection;

    const isAnchorLevelLess = anchorBlockLevel < focusBlockLevel;
    const isEqual = anchorBlockLevel == focusBlockLevel;
    const isAnchorOffsetLess = anchorOffset < focusOffset;

    let lowerNode,
      higherNode,
      lowerIndex,
      lowerOffset,
      higherIndex,
      higherOffset;

    if (isAnchorLevelLess || (isEqual && isAnchorOffsetLess)) {
      lowerNode = anchorNode;
      higherNode = focusNode;
      lowerIndex = anchorBlockLevel;
      lowerOffset = anchorOffset;
      higherIndex = focusBlockLevel;
      higherOffset = focusOffset;
    } else if (!isAnchorLevelLess || (isEqual && !isAnchorOffsetLess)) {
      lowerNode = focusNode;
      higherNode = anchorNode;
      lowerIndex = focusBlockLevel;
      lowerOffset = focusOffset;
      higherIndex = anchorBlockLevel;
      higherOffset = anchorOffset;
    }

    return {
      lowerNode,
      higherNode,
      lowerIndex,
      lowerOffset,
      higherIndex,
      higherOffset,
    };
  };

  const handleSelectionOverwrite = (event) => {
    const selection = window.getSelection();
    const isTextSelected = selection.toString().length;

    if (!isTextSelected) {
      return;
    }

    const { anchorNode, focusNode } = selection;

    let anchorId = getAssociatedId(anchorNode.parentElement);
    let focusId = getAssociatedId(focusNode.parentElement);

    if (anchorId == null || focusId == null) {
      return;
    }

    const anchorBlockLevel = Number(anchorId);
    const focusBlockLevel = Number(focusId);

    const {
      lowerNode,
      higherNode,
      lowerIndex,
      lowerOffset,
      higherIndex,
      higherOffset,
    } = determineSelectionDirection(
      selection,
      anchorBlockLevel,
      focusBlockLevel
    );

    const contentBefore = lowerNode.textContent.slice(0, lowerOffset);
    const contentAfter = higherNode.textContent.slice(higherOffset);
    const key = event.key;

    let contentNew;

    // need to find which cases are important
    if (key.length == 1) {
      contentNew = contentBefore + key + contentAfter;
    } else {
      contentNew = contentBefore + contentAfter;
    }

    const oldBlockId = blocks[lowerIndex].id;

    setBlocks((prev) => {
      if (lowerIndex != higherIndex) {
        return [
          ...prev.slice(0, lowerIndex + 1),
          ...prev.slice(higherIndex + 1),
        ];
      } else {
        return prev;
      }
    });

    editBlocks({
      id: oldBlockId,
      content: contentNew,
      itemPos: lowerIndex,
      action: "edit",
    });

    // allow inputs to exist
    onTextClick(false);

    // set new focus
    const blockRef = getRefById(oldBlockId);
    blockRef.focus();
    blockRef.setSelectionRange(
      contentBefore.length + 1,
      contentBefore.length + 1
    );

    event.preventDefault();
  };

  const shouldHandleMultilineEvent = (event) => {
    const whitespaceKeys = ["Enter", " ", "Backspace"];

    const isWhitespacePressed = whitespaceKeys.some((val) => val == event.key);

    const modifiers = ["Meta", "Control"];

    const isAnyModifierPressed = modifiers.some((val) =>
      event.getModifierState(val)
    );

    // if modifier is pressed we should let default handling
    // for instance: copy and paste

    return (
      (event.key.length == 1 || isWhitespacePressed) && !isAnyModifierPressed
    );
  };

  const handleMultilineKeyboardInput = (event) => {
    if (!shouldHandleMultilineEvent(event)) return;

    handleSelectionOverwrite(event);
  };

  return (
    <div
      className="flex flex-col gap-y-2 justify-center outline-none"
      tabIndex={1}
      onKeyDown={handleMultilineKeyboardInput}
    >
      {children}
    </div>
  );
}

export function Editor() {
  const { blocks, editBlocks, setBlocks, getBlockByIndex } = useBlocks();

  const [disableInput, setDisableInput] = useState(false);

  const onTextClick = (state) => {
    flushSync(() => setDisableInput(state));
  };

  return (
    <EditorProvider>
      <EditorCanvas
        blocks={blocks}
        setBlocks={setBlocks}
        editBlocks={editBlocks}
        onTextClick={onTextClick}
      >
        {blocks.map(({ id, content }, index, blocksArr) => (
          <BlockLine
            key={id}
            content={content}
            renderInputElement={({ ...props }) => (
              <ConnectedInputField
                {...props}
                placeholder="Add block"
                className="outline-none"
                disableInput={disableInput}
                onTextClick={onTextClick}
              />
            )}
            blockId={id}
            previousBlockId={blocksArr[index - 1]?.id}
            blockLineNumber={index}
            changeBlock={editBlocks}
            getBlockByIndex={getBlockByIndex}
          />
        ))}
      </EditorCanvas>
    </EditorProvider>
  );
}
