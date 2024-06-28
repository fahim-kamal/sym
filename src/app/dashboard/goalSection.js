import AddIcon from "@/components/icons/addIcon";

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
        <GoalItem name={name} />
      ))}
    </div>
  );
}

export default function GoalsSection({ goals }) {
  return (
    <div className="py-4">
      <div className="flex flex-row justify-between px-4">
        <h3>Your Goals</h3>
        <AddIcon />
      </div>

      {goals.length ? (
        <GoalsList goalsList={goals} />
      ) : (
        <div className="px-4">Start tracking a goal</div>
      )}
    </div>
  );
}
