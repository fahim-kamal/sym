import Image from "next/image";
import SymLogo from "./symLogo";

export default function SymHeader() {
  return (
    <div className="h-16 flex flex-row items-center mx-20">
      <SymLogo />
    </div>
  );
}
