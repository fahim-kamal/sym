"use client";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Add, Clear, Edit, Done } from "@mui/icons-material";

import { Checkbox } from "@mui/material";
import { useToggle } from "@/hooks/useToggle";

import { useState } from "react";

import { useTaskContext } from "@/context/taskContext";
import { useControlledInput } from "@/hooks/useControlledInput";
import Menu from "../menu";
import TextInput from "../textInput";
import TaskListBar from "./taskListBar";
import TaskDialog from "./taskDialog";

function CircleCheckbox({ checked, onClick }) {
  const checkedColor = "green";

  return (
    <Checkbox
      onClick={onClick}
      checked={checked}
      icon={<RadioButtonUncheckedIcon />}
      checkedIcon={<CheckCircleIcon />}
      sx={{ "&.Mui-checked": { color: checkedColor } }}
    />
  );
}

function TaskTextField({ textSubmitHandler, onTextChange }) {
  const { input, setInput, onInputChange } = useControlledInput();
  const { validateTaskTag } = useTaskContext();

  const [error, setError] = useState(false);

  const onClick = () => {
    const { status, value } = validateTaskTag(input);

    if (status == "error" && value.name != "emptyTag") setError(value);
    else setError(null);
  };

  const handleTextSubmit = () => {
    const { status, value } = validateTaskTag(input);

    if (status == "success") {
      textSubmitHandler(input);
    } else setError(value);
  };

  const handleTextChange = (event) =>
    onTextChange(event, {
      inputSetter: setInput,
      onInputChange,
      errorSetter: setError,
    });

  return (
    <TextInput
      onClick={onClick}
      input={input}
      disabled={error?.name == "maxTag"}
      onChange={handleTextChange}
      placeholder="Create Tag"
      InputAdornment={
        <Add className="hover:cursor-pointer" onClick={handleTextSubmit} />
      }
      error={error?.desc}
    />
  );
}

function TaskTagMenuItem({
  tag,
  tagId,
  selectedTag,
  onTagSelect,
  onTagDelete,
  onTagEdit,
  onTagTextChange,
}) {
  const { validateTaskTag } = useTaskContext();
  const { value: inEditMode, toggle } = useToggle(false);
  const { input, setInput, onInputChange } = useControlledInput(tag);

  const [error, setError] = useState(null);

  const handleTagTextChange = (event) =>
    onTagTextChange(
      event,
      {
        inputSetter: setInput,
        errorSetter: setError,
        onInputChange,
      },
      tagId
    );

  const handleConfirmChange = () => {
    const { status } = validateTaskTag(input, tagId);

    if (status == "success") {
      toggle();
      onTagEdit(input);
    }
  };

  const handleDelete = () => {
    if (inEditMode) {
      toggle();
    } else onTagDelete();
  };

  return (
    <div
      className="p-1 rounded-md hover:cursor-pointer hover:bg-hover-1 data-[selected=true]:font-medium group/tag grid grid-cols-[minmax(0,1fr),_max-content,_max-content] gap-x-1 items-start"
      key={tag}
      data-selected={tag == selectedTag}
    >
      {!inEditMode ? (
        <>
          <div onClick={() => onTagSelect()} className="overflow-clip">
            {tag}
          </div>
          <Edit
            onClick={toggle}
            className="invisible group-hover/tag:visible flex-1 hover:bg-hover-2 rounded-md"
          />
        </>
      ) : (
        <>
          <TextInput
            error={error?.desc}
            variant="standard"
            inputRef={(node) => {
              if (node) {
                node.focus();
              }
            }}
            input={input}
            onChange={handleTagTextChange}
          />
          <Done
            onClick={handleConfirmChange}
            className="invisible group-hover/tag:visible flex-1 hover:bg-hover-2 rounded-md"
          />
        </>
      )}
      <Clear
        onClick={handleDelete}
        className="invisible group-hover/tag:visible flex-1 hover:bg-hover-2 rounded-md"
      />
    </div>
  );
}

function TaskTagMenu({
  selectedTag,
  tagSelectHandler,
  tagDeleteHandler,
  tagCreateHandler,
  handleClose,
}) {
  const { taskTags: tags, renameTaskTag, validateTaskTag } = useTaskContext();

  const [error, setError] = useState(null);

  const attachMenuClose = (cb) => {
    handleClose();
    cb();
  };

  const handleTagSelect = (id) => attachMenuClose(() => tagSelectHandler(id));

  const handleTagDelete = (id) => {
    if (error == "tagLimitReached") {
      setError(null);
    }

    tagDeleteHandler(id);
  };

  const textSubmitHandler = (input) => {
    const id = tagCreateHandler(input);
    handleTagSelect(id);
  };

  const onTextChange = (event, context, tagId = null) => {
    const { inputSetter, onInputChange, errorSetter } = context;

    const prefix = "#";
    const hasLength = event.target.value.length;
    const isPrefixed = event.target.value[0] === prefix;

    if (prefix != "" && hasLength && !isPrefixed) {
      inputSetter(prefix + event.target.value);
    } else onInputChange(event);

    const tagName = isPrefixed
      ? event.target.value
      : prefix + event.target.value;

    const { status, value } = validateTaskTag(tagName, tagId);

    if (status == "error") errorSetter(value);
    else if (status == "success") errorSetter(null);
  };

  return (
    <div className="p-4 rounded-lg border w-[225px] bg-white flex flex-col gap-y-2">
      <div>
        <div className="font-medium">Tags</div>
        <div className="flex flex-col">
          {tags.map(({ tagName: tag, tagId }) => (
            <TaskTagMenuItem
              key={tag}
              tag={tag}
              tagId={tagId}
              selectedTag={selectedTag}
              onTagSelect={() => handleTagSelect(tagId)}
              onTagDelete={() => handleTagDelete(tagId)}
              onTagEdit={(name) => renameTaskTag(tagId, name)}
              onTagTextChange={onTextChange}
            />
          ))}
        </div>
      </div>
      <hr />
      <div className="flex gap-x-2 items-center my-1">
        <TaskTextField
          textSubmitHandler={textSubmitHandler}
          onTextChange={onTextChange}
        />
      </div>
      {Boolean(tags.length) && (
        <>
          <hr />
          <div
            className="px-2 py-1  hover:cursor-pointer hover:bg-hover-1"
            onClick={() => handleTagSelect(null)}
          >
            Clear Tag
          </div>
        </>
      )}
    </div>
  );
}

function TagButton({ tag }) {
  return (
    <div className="px-2 py-[0.125rem] rounded-sm hover:cursor-pointer hover:bg-hover-2 font-medium whitespace-nowrap">
      {tag ?? "#"}
    </div>
  );
}

function TaskTag({ taskId, tagId }) {
  const { dispatchTasks, getTagNameById, createTaskTag, deleteTaskTag } =
    useTaskContext();

  const handleTagClick = (newTagId) => {
    dispatchTasks({ type: "change-task", taskId, change: { tagId: newTagId } });
  };

  const handleTextSubmit = (name) => createTaskTag(name, taskId);

  const tag = getTagNameById(tagId);

  return (
    <Menu
      placement={"bottom-end"}
      Base={<TagButton tag={tag} />}
      Popup={
        <TaskTagMenu
          selectedTag={tag}
          tagSelectHandler={handleTagClick}
          tagDeleteHandler={deleteTaskTag}
          tagCreateHandler={handleTextSubmit}
        />
      }
    />
  );
}

function Task({ taskContent, taskId, tagId, checked, isMenuOpen }) {
  const { dispatchTasks } = useTaskContext();

  const onClick = () =>
    dispatchTasks({
      type: "change-task",
      taskId,
      change: { isTaskChecked: !checked },
    });

  return (
    <div className="px-2 grid w-full grid-cols-[42px,_minmax(0,1fr),_0fr] gap-x-2 items-center hover:bg-hover-1">
      <CircleCheckbox checked={checked} onClick={onClick} />
      <TaskDialog taskContent={taskContent} taskId={taskId} tagId={tagId} />
      <TaskTag taskId={taskId} tagId={tagId} isMenuOpen={isMenuOpen} />
    </div>
  );
}

function AddTaskMenu({ hideMenu }) {
  const { dispatchTasks, validateTask } = useTaskContext();
  const { input, setInput, onInputChange } = useControlledInput();
  const [error, setError] = useState(null);

  const onKeyDown = (event) => {
    if (event.key == "Enter" && error == null) {
      dispatchTasks({ type: "add-task", content: input });
      hideMenu();
    } else if (event.key == "Escape") {
      hideMenu();
    }
  };

  const onChange = (event) => {
    // handle text change
    onInputChange(event);

    // set error if appropriate
    const { status, value } = validateTask(event.target.value);

    if (status == "error") setError(value);
    else setError(null);
  };

  return (
    <>
      <div></div>
      <div className="relative">
        <TextInput
          inputRef={(node) => {
            if (node) {
              node.focus();
            }
          }}
          error={error?.desc}
          input={input}
          onKeyDown={onKeyDown}
          onChange={onChange}
          placeholder="Task name"
          onBlur={hideMenu}
        />
        <div className="absolute right-0 -bottom-6 text-gray-400 text-sm">
          Press Enter to submit, Esc to cancel.
        </div>
      </div>
    </>
  );
}

function AddTask() {
  const { value: showMenu, toggle, setValue } = useToggle(false);

  const setFalse = () => setValue(false);

  return (
    <>
      <div
        onClick={toggle}
        className="px-2 gap-x-2 grid grid-cols-[42px,_1fr] hover:cursor-pointer hover:bg-hover-1 h-[42px] items-center"
      >
        {showMenu ? (
          <AddTaskMenu hideMenu={setFalse} />
        ) : (
          <>
            <div className="justify-self-center">
              <Add />
            </div>
            <div>Add Task</div>
          </>
        )}
      </div>
    </>
  );
}

export default function TaskList() {
  const { getTasks } = useTaskContext();
  const tasks = getTasks();

  return (
    <div className="w-[400px] p-2">
      <div className="px-2 flex justify-between">
        <h3>Today's Tasks</h3>
        <TaskListBar />
      </div>
      {tasks.map(({ taskId, tagId, taskContent, isTaskChecked }) => (
        <Task
          key={taskId}
          taskId={taskId}
          taskContent={taskContent}
          tagId={tagId}
          checked={isTaskChecked}
        />
      ))}
      <AddTask />
    </div>
  );
}
