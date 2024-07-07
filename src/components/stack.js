export default function Stack({ children }) {
  return (
    <div className="w-full h-full grid grid-rows-1 grid-cols-1 *:row-start-1 *:col-start-1">
      {children}
    </div>
  );
}
