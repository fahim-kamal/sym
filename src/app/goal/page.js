import SymHeader from "@/components/symHeader";
import { GoalHeader, GoalBody } from "./goal";
import Overflow from "@/components/overflow";

function GoalContent() {
  return (
    <div className="flex-1 ml-40 mb-6 overflow-hidden">
      <div className="h-full flex flex-col gap-y-4">
        <GoalHeader />
        <GoalBody />
      </div>
    </div>
  );
}

export default function GoalPage() {
  return (
    <div className="flex flex-col">
      {/* <SymHeader /> */}
      <GoalContent />
    </div>
  );
}
