import { useReducer, useContext, useState, createContext } from "react";

import { v4 as uuidv4 } from "uuid";

const createError = (name, desc) => {
  return { name, desc };
};

export const taskErrorStates = {
  tagCharacterLimit: createError(
    "characterLimit",
    "Cannot create a tag with greater than 30 characters."
  ),
  tagAlreadySet: createError(
    "tagAlreadySet",
    "Cannot set a tag with an identical name."
  ),
  maxTags: createError("maxTags", "Cannot create more than 5 tags."),
  emptyTag: createError("emptyTag", "Cannot create an empty tag."),
  taskNameCharacterLimit: createError(
    "taskNameCharacterLimit",
    "Cannot name a task with greater than 250 characters."
  ),
};

function createTask(content, tagId = null) {
  return {
    taskId: uuidv4(),
    taskContent: content,
    isTaskChecked: false,
    tagId,
  };
}

function tasksReducer(state, action) {
  switch (action.type) {
    case "add-task": {
      return [...state, createTask(action.content)];
    }
    case "change-task": {
      const pos = state.findIndex(({ taskId }) => taskId == action.taskId);

      return [
        ...state.slice(0, pos),
        { ...state[pos], ...action.change },
        ...state.slice(pos + 1),
      ];
    }
    case "delete-task": {
      const pos = state.findIndex(({ taskId }) => taskId == action.taskId);

      return [...state.slice(0, pos), ...state.slice(pos + 1)];
    }
    case "remove-tagId": {
      return [
        ...state.map((prev) => {
          if (prev.tagId == action.tagId) {
            return { ...prev, tagId: null };
          } else return prev;
        }),
      ];
    }
  }
}

function createTaskTag(tagId, tagName) {
  return { tagId, tagName };
}

function taskTagsReducer(state, action) {
  switch (action.type) {
    case "add-tag": {
      const alreadyExists =
        state.findIndex(({ tagName }) => action.tagName == tagName) !== -1;

      if (!alreadyExists) {
        return [...state, createTaskTag(action.tagId, action.tagName)];
      } else {
        return state;
      }
    }
    case "change-tag": {
      const pos = state.findIndex(({ tagId }) => tagId == action.tagId);

      return [
        ...state.slice(0, pos),
        { ...state[pos], ...action.change },
        ...state.slice(pos + 1),
      ];
    }
    case "remove-tag": {
      return [...state.filter(({ tagId }) => tagId !== action.tagId)];
    }
  }
}

export const TaskContext = createContext(null);

export default function TaskProvider({ children }) {
  const initialTask = createTask("Get groceries");
  const [tasks, dispatchTasks] = useReducer(tasksReducer, [initialTask]);
  const [taskTags, dispatchTaskTags] = useReducer(taskTagsReducer, []);
  const [filter, setFilter] = useState({ filter: "passthrough", param: null });
  const [sort, setSort] = useState("passthrough");

  const validateTaskTag = (tagName, tagId = null) => {
    const maxNumTags = 5;
    const numTags = taskTags.length;

    if (numTags > maxNumTags) {
      return { status: "error", value: taskErrorStates.maxTags };
    }

    const isAlreadySet =
      taskTags.findIndex(
        ({ tagName: exisitingTagName, tagId: existingTagId }) => {
          const sameName = exisitingTagName == tagName;
          const sameId = existingTagId == tagId;

          if (tagId) {
            return sameName && !sameId;
          } else return sameName;
        }
      ) !== -1;

    if (isAlreadySet) {
      return { status: "error", value: taskErrorStates.tagAlreadySet };
    }

    const maxTagLength = 30;
    const tagLength = tagName.length;

    if (tagLength > maxTagLength) {
      return { status: "error", value: taskErrorStates.tagCharacterLimit };
    } else if (tagLength <= 1) {
      return { status: "error", value: taskErrorStates.emptyTag };
    }

    return { status: "success", value: undefined };
  };

  const validateTask = (taskName) => {
    const maxTaskNameLength = 250;
    const taskNameLength = taskName.length;

    if (taskNameLength > maxTaskNameLength)
      return { status: "error", value: taskErrorStates.taskNameCharacterLimit };
    else return { status: "success", value: undefined };
  };

  const createTaskTag = (name) => {
    // const new id
    const tagId = uuidv4();

    // add  to tasktag store
    dispatchTaskTags({ type: "add-tag", tagId, tagName: name });

    return tagId;
  };

  const deleteTaskTag = (tagId) => {
    // remove task from tasktag store
    dispatchTaskTags({ type: "remove-tag", tagId });

    // set task tags to null
    dispatchTasks({ type: "remove-tagId", tagId });
  };

  const getTagNameById = (tagIdToFind) => {
    return taskTags.find(({ tagId }) => tagId == tagIdToFind)?.tagName;
  };

  const renameTaskTag = (tagId, name) => {
    dispatchTaskTags({ type: "change-tag", tagId, change: { tagName: name } });
  };

  const getTasks = () => {
    const filters = {
      passthrough: () => true,
      onlyUnchecked: ({ isTaskChecked }) => !isTaskChecked,
      tag: ({ tagId }) => tagId == filter.param,
    };

    const sorts = {
      passthrough: () => 0,
      up: ({ isTaskChecked: a }, { isTaskChecked: b }) => {
        return a == b ? 0 : a ? -1 : 1;
      },
      down: ({ isTaskChecked: a }, { isTaskChecked: b }) => {
        return a == b ? 0 : a ? 1 : -1;
      },
    };

    return tasks.filter(filters[filter.filter]).toSorted(sorts[sort]);
  };

  const value = {
    tasks,
    getTasks,
    dispatchTasks,
    taskTags,
    dispatchTaskTags,
    getTagNameById,
    createTaskTag,
    deleteTaskTag,
    validateTaskTag,
    validateTask,
    renameTaskTag,
    filter,
    setFilter,
    sort,
    setSort,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export const useTaskContext = () => {
  return useContext(TaskContext);
};
