import SymHeader from "@/components/symHeader";
import { GoalHeader, GoalBody } from "./goal";

function GoalContentContainer({ children }) {
  return <div className="px-20 py-6">{children}</div>;
}

function GoalContent() {
  return (
    <div className="flex flex-col gap-y-4">
      <GoalHeader />
      <GoalBody />
    </div>
  );
}

export default function GoalPage() {
  return (
    <div>
      <SymHeader />
      <GoalContentContainer>
        <GoalContent />
      </GoalContentContainer>
    </div>
  );
}
