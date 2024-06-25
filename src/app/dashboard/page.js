import SymHeader from "@/components/symHeader";
import GoalList from "./goalList";
import Sidebar from "./sidebar";
import ReactQueryProvider from "@/context/queryContext";

export default function Dashboard() {
  return (
    <div className="bg-sym_bg_gray h-dvh flex flex-col">
      <SymHeader />
      <Sidebar />
      <ReactQueryProvider>{/* <GoalList /> */}</ReactQueryProvider>
    </div>
  );
}
