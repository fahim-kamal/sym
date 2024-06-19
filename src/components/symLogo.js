import Image from "next/image";

export default function SymLogo() {
  return (
    <div className="flex flex-row gap-x-2 items-center">
      <Image src={"/logo.svg"} width={24} height={24} />
      <div className="font-bold text-2xl">SYM</div>
    </div>
  );
}
