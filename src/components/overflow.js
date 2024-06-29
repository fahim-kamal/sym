export default function Overflow({ num = 20 }) {
  return (
    <>
      {new Array(num).fill(0).map((val, idx) => (
        <div key={idx}>{idx}</div>
      ))}
    </>
  );
}
