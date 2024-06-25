import { AddIconButton, LinkIconButton } from "@/components/iconButton";
import { CreatePostButton } from "@/components/textButton";

function GoalSummary() {
  const noGoalsMessage = "You haven't started tracking any goals yet. ";
  return (
    <div>
      <h3>Your Goals at a Glance</h3>
      <div>{noGoalsMessage}</div>
    </div>
  );
}

function PostCreatorButtonRow() {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-x-3">
        <AddIconButton />
        <LinkIconButton />
      </div>
      <CreatePostButton />
    </div>
  );
}

function PostCreator() {
  const createPostSubtitle = "Let your friends know your latest progress.";

  return (
    <div className="flex flex-col gap-y-3">
      <div>
        <h3>Share an update</h3>
        <div>{createPostSubtitle}</div>
      </div>
      <textarea className="bg-sym_bg_gray w-full h-32 rounded-xl p-2 resize-none" />
      <PostCreatorButtonRow />
    </div>
  );
}

function DashboardOverviewContent() {
  return (
    <div className="flex flex-col gap-y-6 ">
      <GoalSummary />
      <PostCreator />
    </div>
  );
}

export default function DashboardOverview() {
  return (
    <div className="bg-white mx-5 my-4 rounded-xl min-w-[400px]">
      <div className="m-4 flex flex-col gap-2">
        <h2>Your Dashboard</h2>
        <DashboardOverviewContent />
      </div>
    </div>
  );
}
