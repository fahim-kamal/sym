import SymHeader from "@/components/symHeader";
import GoalList from "./goalList";
import Sidebar from "./sidebar";
import DashboardOverview from "./dashboardOverview";
import ReactQueryProvider from "@/context/queryContext";
import PostList, { samplePostData } from "@/components/post";

function DashboardContent() {
  return (
    <div className="flex flex-row h-dvh overflow-y-hidden">
      <Sidebar />
      <DashboardOverview />
      <PostList posts={samplePostData} />
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="bg-sym_bg_gray flex flex-col h-dvh">
      <SymHeader />
      <DashboardContent />
      <ReactQueryProvider>{/* <GoalList /> */}</ReactQueryProvider>
    </div>
  );
}
