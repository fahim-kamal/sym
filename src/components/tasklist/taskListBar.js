import { useTaskContext } from "@/context/taskContext";
import Menu from "../menu";

import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

function SortMenu() {
  const { sort, setSort } = useTaskContext();

  const onSortClick = () => {
    setSort((prev) => {
      if (prev == "passthrough") return "up";
      else if (prev == "up") return "down";
      else return "passthrough";
    });
  };

  return (
    <div className="flex gap-x-1" onClick={onSortClick}>
      <div>Sort</div>
      {sort == "up" ? (
        <ArrowUpward fontSize="small" />
      ) : sort == "down" ? (
        <ArrowDownward fontSize="small" />
      ) : (
        <></>
      )}
    </div>
  );
}

function FilterPopup({ handleClose }) {
  const { taskTags, setFilter, filter } = useTaskContext();

  const filterBySelectedTag = (tagId) => {
    setFilter({ filter: "tag", param: tagId });
    handleClose();
  };

  return (
    <div className="bg-white border rounded-lg p-4 w-[225px] flex flex-col gap-y-1 ">
      <h3>Filters</h3>
      <div>
        Click on a tag to only view tasks in the tasklist with that label.
      </div>
      <hr />
      <div className="[&>div]:cursor-pointer ">
        {taskTags.map(({ tagName, tagId }) => (
          <div
            data-selected={tagId == filter?.param}
            className="py-1 hover:bg-hover-1 data-[selected=true]:font-bold"
            key={tagId}
            onClick={() => filterBySelectedTag(tagId)}
          >
            {tagName}
          </div>
        ))}
        {taskTags.length ? (
          <div
            className="py-1 hover:bg-hover-1"
            onClick={() => {
              setFilter({ filter: "passthrough" });
              handleClose();
            }}
          >
            Clear
          </div>
        ) : (
          <div className="font-medium !cursor-auto">
            You have not set any tags yet!
          </div>
        )}
      </div>
    </div>
  );
}

function FilterMenu() {
  const { filter } = useTaskContext();

  return (
    <Menu
      Base={
        <div
          data-filterset={filter?.filter != "passthrough"}
          className="data-[filterset=true]:font-bold"
        >
          Filter
        </div>
      }
      Popup={<FilterPopup />}
    />
  );
}

export default function TaskListBar() {
  return (
    <div className="flex w-fit gap-x-2 justify-end [&>div]:hover:cursor-pointer">
      <SortMenu />
      <FilterMenu />
    </div>
  );
}
