import SymLogo from "./symLogo";

export default function SymHero() {
  return (
    <div className="flex flex-col justify-center items-center">
      <SymLogo />
      <div className="text-[64px] font-bold">
        Making{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-sym_red via-sym_blue to-sym_green">
          productivity
        </span>{" "}
        simple.
      </div>
      <div className="text-4xl">
        We help document your progress towards goals.
      </div>
    </div>
  );
}
