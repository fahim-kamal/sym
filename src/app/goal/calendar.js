"use client";

export default function Calendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const todayDate = today.getDate();

  const firstDateOfMonth = new Date(year, month, 1);
  const firstDay = firstDateOfMonth.getDay();
  const lastDateOfMonth = new Date(year, month + 1, 0);
  const lastDateNum = lastDateOfMonth.getDate();

  let numDaysToVisualize = lastDateNum + firstDay + 1;

  if (numDaysToVisualize % 7 !== 0) {
    const mult = Math.floor(numDaysToVisualize / 7);
    const newDaysToVisualize = (mult + 1) * 7;
    numDaysToVisualize = newDaysToVisualize;
  }

  const dateArray = new Array(numDaysToVisualize).fill(0).map((val, index) => {
    if (index >= firstDay && index <= lastDateNum + firstDay - 1) {
      return `${index - firstDay + 1}`;
    } else return "";
  });

  const dateArrayPartitioned = new Array(numDaysToVisualize / 7)
    .fill(0)
    .map(() => new Array(7).fill(0));

  dateArray.forEach((day, index) => {
    dateArrayPartitioned[Math.floor(index / 7)][index % 7] = day;
  });

  const daysOfWeek = ["Su", "M", "T", "W", "Th", "F", "S"];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <table className="w-[300px] text-center table-fixed">
      <thead>
        <tr>
          <td colSpan={7} className="py-2 font-bold">
            {monthsOfYear[month]}
          </td>
        </tr>
        <tr className="font-bold">
          {daysOfWeek.map((day) => (
            <td key={day}>{day}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {dateArrayPartitioned.map((partition, partitionIdx) => {
          return (
            <tr key={partitionIdx}>
              {partition.map((date, weekIdx) => {
                const selected =
                  "rounded-full bg-sym_green w-8 h-8 m-auto flex flex-row justify-center items-center";
                const isToday = date === `${todayDate}`;

                return (
                  <td key={`${partitionIdx}_${weekIdx}`}>
                    <div className={isToday ? selected : "py-2"}>{date}</div>
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
