import ImgIcon from "./imgIcon";
import InboxIcon from "./inboxIcon";
import HeartIcon from "./heartIcon";
import CommentIcon from "./commentIcon";
import ArrowRightIcon from "./arrowRightIcon";

export function AddIconButton() {
  return <IconButton icon={<ImgIcon />} text="Add Image" />;
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
