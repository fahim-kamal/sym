import ImgIcon from "./imgIcon";
import InboxIcon from "./inboxIcon";

export function AddIconButton() {
  return <IconButton icon={<ImgIcon />} text="Add Image" />;
}

export function LinkIconButton() {
  return <IconButton icon={<InboxIcon />} text="Link Goal" />;
}

export default function IconButton({ icon, text }) {
  return (
    <div className="px-2 py-1 grid w-max rounded grid-flow-col auto-cols-max gap-x-4 items-center  bg-sym_bg_gray">
      {icon}
      <div className="text-xs">{text}</div>
    </div>
  );
}
