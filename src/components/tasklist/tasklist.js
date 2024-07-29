"use client";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Add } from "@mui/icons-material";

import { Checkbox, TextField } from "@mui/material";
import { useToggle } from "@/hooks/useToggle";

import { useReducer, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { LightboxMenu } from "../lightboxMenu";
import TextButton from "../textButton";

function CircleCheckbox() {
  const checkedColor = "green";

  return (
    <Checkbox
      icon={<RadioButtonUncheckedIcon />}
      checkedIcon={<CheckCircleIcon />}
      sx={{ "&.Mui-checked": { color: checkedColor } }}
    />
  );
}

function TaskTagMenu({ selectedTag, handleTagClick }) {
  const tags = ["beans", "boots", "tigers"];

  return (
    <div className="p-4 rounded-lg border min-w-[100px] bg-white">
      <div className="font-medium mb-1">Tags</div>
      <div className="flex flex-col">
        {tags.map((tag) => (
          <div
            className="py-1 hover:cursor-pointer data-[selected=true]:font-medium odd:border-t-2 odd:border-b-2 first:!border-t-0 last:!border-b-0"
            id={tag}
            onClick={() => handleTagClick(tag)}
            data-selected={tag == selectedTag}
          >
            #{tag}
          </div>
        ))}
      </div>
    </div>
  );
}

function TaskTag({ isMenuOpen, handleMenuClick }) {
  const [selectedTag, setSelectedTag] = useState("beans");

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
    handleMenuClick();
  };

  return (
    <div className="relative">
      <div
        onClick={handleMenuClick}
        className="px-2 py-[0.125rem] rounded-sm hover:cursor-pointer hover:bg-gray-100 font-medium"
      >
        #{selectedTag}
      </div>
      {isMenuOpen && (
        <div className="absolute right-0 z-10">
          <TaskTagMenu
            selectedTag={selectedTag}
            handleTagClick={handleTagClick}
          />
        </div>
      )}
    </div>
  );
}

function Task({ taskContent, checked, handleMenuClick, isMenuOpen }) {
  return (
    <div className="grid w-full grid-cols-[42px,_1fr,_0fr] gap-x-2 items-center hover:bg-gray-50 px-2">
      <CircleCheckbox />
      <div>{taskContent}</div>
      <TaskTag isMenuOpen={isMenuOpen} handleMenuClick={handleMenuClick} />
    </div>
  );
}

function AddTaskMenu() {
  return (
    <div className="w-[400px] p-8 rounded-md bg-white flex flex-col gap-y-4">
      <h3>Create a new task</h3>
      <TextField label="Task Name" size="small" variant="outlined" fullWidth />
      <TextButton text="Add Task" variant="solid" width="w-full" />
      {/* <input /> */}
    </div>
  );
}

function AddTask({ onClick }) {
  const { value, setValue } = useToggle(false);

  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  return (
    <>
      <div
        onClick={setTrue}
        className="px-2 gap-x-2 grid grid-cols-[42px,_1fr] text-gray-400 hover:text-black hover:cursor-pointer"
      >
        <div className="justify-self-center">
          <Add />
        </div>
        <div>Add Task</div>
      </div>
      {value && (
        <LightboxMenu showLightbox={value} closeLightbox={setFalse}>
          <AddTaskMenu />
        </LightboxMenu>
      )}
    </>
  );
}

function createNewTask(content) {
  return { taskId: uuidv4(), taskContent: content, isTaskChecked: false };
}

function tasksReducer(state, action) {
  switch (action.type) {
    case "add-task": {
      return [...state, createNewTask(action.content)];
    }
  }
}

export default function TaskList() {
  const initialTask = createNewTask("Get groceries");
  const [tasks, dispatchTask] = useReducer(tasksReducer, [initialTask]);

  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuClick = (taskId) => {
    setSelectedMenu((prev) => {
      if (prev == taskId) return null;
      else return taskId;
    });
  };

  return (
    <div className="w-[400px]">
      <AddTask />
      {tasks.map(({ taskId, taskContent, isTaskChecked }) => (
        <Task
          id={taskId}
          taskId={taskId}
          taskContent={taskContent}
          checked={isTaskChecked}
          isMenuOpen={taskId == selectedMenu}
          handleMenuClick={() => handleMenuClick(taskId)}
        />
      ))}
      <AddTaskMenu />
    </div>
  );
}
