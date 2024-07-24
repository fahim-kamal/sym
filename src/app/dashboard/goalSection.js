"use client";

import ClientPortal from "@/components/clientPortal";
import AddIcon from "@/components/icons/addIcon";
import CloseIcon from "@mui/icons-material/Close";

import { useToggle } from "@/hooks/useToggle";

import TextButton from "@/components/textButton";

import { useRouter } from "next/navigation";

export const testGoals = [
  { name: "Working Out Everyday" },
  { name: "Drinking More Water" },
  { name: "Saving Money" },
];

function GoalItem({ name }) {
  return (
    <div className="truncate px-4 py-1 hover:bg-sym_bg_gray hover:cursor-pointer">
      {name}
    </div>
  );
}

function GoalsList({ goalsList }) {
  return (
    <div className="flex flex-col">
      {goalsList.map(({ name }) => (
        <GoalItem name={name} key={name} />
      ))}
    </div>
  );
}

function LightboxMenu({ children, showLightbox, closeLightbox }) {
  return showLightbox ? (
    <>
      <div
        className="absolute top-0 left-0 w-screen h-screen bg-black/20"
        onClick={closeLightbox}
      />
      {children}
    </>
  ) : (
    <></>
  );
}

export function AddButtonForm({
  handleSubmit = () => {},
  handleClose = () => {},
}) {
  return (
    <div className="bg-white w-[400px] h-[200px] border p-4 rounded-lg flex flex-col justify-between">
      <div className="flex flex-col gap-y-4">
        <div className="flex justify-between">
          <h3>Track a new goal</h3>
          <div className="hover:cursor-pointer" onClick={handleClose}>
            <CloseIcon />
          </div>
        </div>
        <div className="w-full flex flex-col gap-y-1">
          <div className="font-medium">State what you want to accomplish.</div>
          <input
            className="border-2 border-solid rounded-md px-2 py-1 focus:outline-none w-full"
            placeholder="I want to..."
          />
        </div>
      </div>
      <div className="" onClick={handleSubmit}>
        <TextButton variant="solid" width="w-full" text="Create page" />
      </div>
    </div>
  );
}

function AddGoalButton() {
  const { value, setValue } = useToggle(false);
  const router = useRouter();

  const handleClose = () => setValue(false);

  const handleSubmit = () => {
    // should wait for db to update before moving to page eventually
    router.replace("/goal");
  };

  return (
    <div className="hover:cursor-pointer">
      <div
        onClick={() => {
          setValue(true);
        }}
      >
        <AddIcon />
      </div>
      <LightboxMenu showLightbox={value} closeLightbox={handleClose}>
        <div className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
          <AddButtonForm
            handleSubmit={handleSubmit}
            handleClose={handleClose}
          />
        </div>
      </LightboxMenu>
    </div>
  );
}

export default function GoalsSection({ goals }) {
  return (
    <div className="py-4">
      <div className="flex flex-row justify-between px-4">
        <h3>Your Goals</h3>
        <AddGoalButton />
      </div>

      {goals.length ? (
        <GoalsList goalsList={goals} />
      ) : (
        <div className="px-4">Start tracking a goal</div>
      )}
    </div>
  );
}
