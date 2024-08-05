export default function TextInput({
  variant = "outline",
  placeholder,
  input,
  onBlur,
  onChange,
  InputAdornment = <></>,
  disabled,
  error,
  onClick,
  onKeyDown,
  inputRef,
}) {
  return (
    <div className="flex flex-col gap-y-2 group/input w-full">
      <div
        className={
          "flex justify-between items-center rounded-sm w-full" +
          ` ${
            variant == "outline"
              ? "px-2 py-1 outline outline-gray-400 has-[:focus]:outline-black"
              : variant == "standard" && error != null
              ? "border-b border-error"
              : ""
          }` +
          ` ${
            error != null
              ? " !outline-error has-[:disabled]:!outline-gray-400 [&>*]:has-[:disabled]:!cursor-not-allowed"
              : ""
          }`
        }
      >
        <input
          ref={inputRef}
          onBlur={onBlur}
          onClick={onClick}
          onKeyDown={onKeyDown}
          disabled={disabled}
          value={input}
          onChange={onChange}
          placeholder={placeholder}
          className="outline-none bg-transparent w-full"
        />
        <>{InputAdornment}</>
      </div>
      {error && (
        <div className="text-sm text-error group-has-[:disabled]/input:hidden group-has-[:disabled]/input:!text-black group-hover/input:!block">
          {error}
        </div>
      )}
    </div>
  );
}
