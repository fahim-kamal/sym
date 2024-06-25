export default function TextButton({ text }) {
  return (
    <div className="px-2 py-1 grid w-max rounded grid-flow-col auto-cols-max gap-x-4 items-center border border-black">
      <div className="text-xs">{text}</div>
    </div>
  );
}

export function CreatePostButton() {
  return <TextButton text="Create Post" />;
}
