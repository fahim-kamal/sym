export default function TextButton({ text, variant = "outline" }) {
  const variantStyles = {
    outline: "border border-black text-sm",
    solid: "bg-black text-white font-bold text-xs",
  };

  return (
    <div
      className={
        "px-2 py-1 grid w-max rounded grid-flow-col auto-cols-max gap-x-4 items-center hover:cursor-pointer " +
        variantStyles[variant]
      }
    >
      <div className="">{text}</div>
    </div>
  );
}

export function CreatePostButton() {
  return <TextButton text="Create Post" />;
}
