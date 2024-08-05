import { useState } from "react";
import { Dialog, DialogContent } from "@mui/material";
import TextButton from "../textButton";
import TextInput from "../textInput";
import { useControlledInput } from "@/hooks/useControlledInput";
import { useTaskContext } from "@/context/taskContext";
import { useError } from "@/hooks/useError";
import { Delete } from "@mui/icons-material";

export default function TaskDialog({ taskId, taskContent, tagId }) {
  const { validateTask, dispatchTasks } = useTaskContext();

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { error, validate } = useError(validateTask);
  const { input, onInputChange } = useControlledInput(taskContent, validate);

  const changeTaskContent = (taskId, taskContent) => {
    dispatchTasks({
      type: "change-task",
      taskId: taskId,
      change: { taskContent: taskContent },
    });
  };

  const deleteTask = (taskId) => {
    dispatchTasks({ type: "delete-task", taskId: taskId });
  };

  const handleSubmit = () => {
    if (error == null) {
      changeTaskContent(taskId, input);
      handleClose();
    }
  };

  const handleDelete = () => {
    deleteTask(taskId);
    handleClose();
  };

  return (
    <div className="w-full">
      <div className="hover:cursor-pointer break-words" onClick={handleOpen}>
        {taskContent}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{ backdrop: { sx: { background: "rgba(0, 0, 0, 0.25)" } } }}
      >
        <DialogContent>
          <div className="w-[400px] flex flex-col gap-y-4">
            <div className="flex justify-between">
              <h3>Modify Task</h3>
              <Delete
                className="hover:text-error hover:cursor-pointer"
                onClick={handleDelete}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <div>Task Name</div>
              <TextInput
                input={input}
                onChange={onInputChange}
                error={error?.desc}
              />
            </div>
            <div className="flex justify-between gap-x-2">
              <TextButton
                width="w-full"
                variant="solid"
                text="Confirm"
                onClick={handleSubmit}
              />
              <TextButton variant="solid" text="Cancel" onClick={handleClose} />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
