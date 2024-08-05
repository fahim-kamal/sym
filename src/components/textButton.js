export default function TextButton({
  text,
  variant = "outline",
  width = "w-max",
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={
        "px-2 py-1 rounded flex justify-center gap-x-4 items-center hover:cursor-pointer " +
        ` ${
          variant == "outline"
            ? "border border-black text-sm"
            : variant == "solid"
            ? "bg-black text-white hover:bg-zinc-700"
            : ""
        }` +
        ` ${width}`
      }
    >
      <div className="select-none">{text}</div>
    </div>
  );
}

export function CreatePostButton() {
  return <TextButton text="Create Post" />;
}

export function ChangeBackground() {
  return <TextButton />;
}
