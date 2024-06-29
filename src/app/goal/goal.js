import Calendar from "./calendar";
import TextButton from "@/components/textButton";
import Note from "./note";
import ChatBox from "./chatBox";
import Overflow from "@/components/overflow";

function AddIconButton() {
  return <TextButton text="Add Icon" variant="solid" />;
}

function AddBannerIcon() {
  return <TextButton text="Add Banner" variant="solid" />;
}

function AddDeadline() {
  return <TextButton text="Add Deadline" variant="solid" />;
}

function GoalButtonRow() {
  return (
    <div className="flex flex-row gap-x-2">
      <AddIconButton />
      <AddBannerIcon />
      <AddDeadline />
    </div>
  );
}

export function GoalHeader() {
  return (
    <div className="flex flex-col gap-y-4">
      <h2>My goal is to...</h2>
      <GoalButtonRow />
    </div>
  );
}

export function GoalBody() {
  return (
    <div className="h-full overflow-hidden flex gap-x-4">
      <div className="p-8 border rounded-xl">
        <Calendar />
      </div>
      <Note />
      <ChatBox />
    </div>
  );
}
