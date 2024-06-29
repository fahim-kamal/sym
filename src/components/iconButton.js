import ImgIcon from "./icons/imgIcon";
import InboxIcon from "./icons/inboxIcon";
import HeartIcon from "./icons/heartIcon";
import CommentIcon from "./icons/commentIcon";
import ArrowRightIcon from "./icons/arrowRightIcon";
import DocumentChartIcon from "./icons/documentChartIcon";
import TableIcon from "./icons/tableIcon";
import AddIcon from "./icons/addIcon";

export function AddImageButton() {
  return <IconButton icon={<ImgIcon />} text="Add Image" variant="snug" />;
}

export function LinkIconButton() {
  return <IconButton icon={<InboxIcon />} text="Link Goal" />;
}

export function LikeIconButton() {
  return (
    <IconButton
      icon={<HeartIcon />}
      text="Like"
      backgroundColor="white"
      variant="snug"
    />
  );
}

export function CommentButton() {
  return (
    <IconButton
      icon={<CommentIcon />}
      text="Comment"
      backgroundColor="white"
      variant="snug"
    />
  );
}

export function GoToGoalButton() {
  return (
    <IconButton
      icon={<ArrowRightIcon />}
      text="Go to Goal"
      backgroundColor="white"
      variant="snug"
    />
  );
}

export function TrackMetricButton() {
  return (
    <IconButton
      icon={<DocumentChartIcon />}
      text="Track Metric"
      variant="snug"
    />
  );
}

export function CreateTableButton() {
  return <IconButton icon={<TableIcon />} text="Create Table" variant="snug" />;
}

export function CreateTextButton() {
  return (
    <IconButton
      icon={<AddIcon />}
      text="Add Text"
      variant="snug"
      backgroundColor="white"
    />
  );
}

export default function IconButton({
  icon,
  text,
  backgroundColor = "gray",
  variant = "default",
}) {
  const bgColor = {
    gray: "bg-sym_bg_gray",
    white: "bg-white",
  };

  const sizing = {
    default: "gap-x-4",
    snug: "gap-x-2",
  };

  return (
    <div
      className={
        "px-2 py-1 grid w-max rounded grid-flow-col auto-cols-max items-center hover:cursor-pointer " +
        bgColor[backgroundColor] +
        " " +
        sizing[variant]
      }
    >
      {icon}
      <div className="text-sm">{text}</div>
    </div>
  );
}
