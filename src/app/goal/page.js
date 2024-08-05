import SymHeader from "@/components/symHeader";
import { GoalHeader, GoalBody } from "./goal";
import Overflow from "@/components/overflow";
import Sidebar from "../dashboard/sidebar";
// import GoalBanner from "./goalBanner";

function GoalContent() {
  return (
    <div className="flex-1 pb-10 overflow-hidden bg-gray-50">
      <div className="h-full flex flex-col">
        {/* <GoalBanner /> */}
        <GoalHeader />
        <GoalBody />
      </div>
    </div>
  );
}

export default function GoalPage() {
  return (
    <div className="flex flex-col">
      <SymHeader />
      <div className="flex">
        <Sidebar />
        <GoalContent />
      </div>
    </div>
  );
}
