import Avatar from "@/components/avatar";

import GoalsSection, { testGoals } from "./goalSection";

function ProfileInfo() {
  return (
    <div className="flex flex-row gap-x-4 py-1.5 items-center">
      <Avatar
        src={
          "https://onlineprofilepros.com/wp-content/uploads/2019/05/Meet-People-Online.jpg"
        }
      />
      <div>Fahim Kamal</div>
    </div>
  );
}

function FriendsSidebarSection() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <div>
        <h3>Your Friends</h3>
        <div>Follow your network's progress</div>
      </div>
      <ProfileInfo />
    </div>
  );
}

export default function Sidebar() {
  return (
    <div className="w-[250px] py-4 flex flex-col gap-4 bg-white flex-1">
      <GoalsSection goals={testGoals} />
      <FriendsSidebarSection />
    </div>
  );
}
