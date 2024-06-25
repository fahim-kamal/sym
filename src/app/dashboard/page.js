import SymHeader from "@/components/symHeader";
import GoalList from "./goalList";
import Sidebar from "./sidebar";
import DashboardOverview from "./dashboardOverview";
import ReactQueryProvider from "@/context/queryContext";

function DashboardContent() {
  return (
    <div className="flex flex-row flex-1">
      <Sidebar />
      <DashboardOverview />
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="bg-sym_bg_gray h-dvh flex flex-col">
      <SymHeader />
      <DashboardContent />
      <ReactQueryProvider>{/* <GoalList /> */}</ReactQueryProvider>
    </div>
  );
}
