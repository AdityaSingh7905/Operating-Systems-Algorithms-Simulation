import React, { useContext } from "react";
import { SimulationContext } from "../../context/SimulationContext";

const FinalTable = ({ isPriority }) => {
  const {
    processes,
    finalTable,
    avgWaitingTime,
    avgTurnAroundTime,
    setAvgWaitingTime,
    setAvgTurnAroundTime,
  } = useContext(SimulationContext);

  if (processes.length > 0 || finalTable.length === 0) {
    return;
  }

  console.log("Final Table length: ", finalTable.length);

  const totalWT = finalTable.reduce((sum, p) => sum + p.waiting, 0);
  const totalTAT = finalTable.reduce((sum, p) => sum + p.turnaround, 0);

  console.log("total Waiting Time: ", totalWT);
  console.log("total Turn Around Time: ", totalTAT);

  const avgWT = totalWT / finalTable.length;
  const avgTAT = totalTAT / finalTable.length;

  console.log("Avg Waiting Time: ", avgWT);
  console.log("Avg Turn Around Time: ", avgTAT);

  setAvgWaitingTime(avgWT);
  setAvgTurnAroundTime(avgTAT);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-72 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">📋 Final Process Table</h2>
      <table className="min-w-full table-auto border border-gray-300 dark:border-gray-600">
        <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm">
          <tr>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
              ID
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
              Arrival Time
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
              Burst Time
            </th>
            {isPriority && (
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Priority
              </th>
            )}
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
              Completion Time
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
              Waiting Time
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
              Turnaround Time
            </th>
          </tr>
        </thead>
        <tbody>
          {finalTable.map((proc, index) => (
            <tr
              key={index}
              className="hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
            >
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {proc.id}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {proc.arrival}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {proc.burst}
              </td>
              {isPriority && (
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  {proc.priority}
                </td>
              )}
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {proc.completion ?? "-"}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {proc.waiting ?? "-"}
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                {proc.turnaround ?? "-"}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium text-sm">
          <tr>
            <td
              className="border px-4 py-2 text-center"
              colSpan={isPriority ? 5 : 4}
            >
              Averages
            </td>
            <td className="border px-4 py-2 text-center">
              {avgWaitingTime.toFixed(2)}
            </td>
            <td className="border px-4 py-2 text-center">
              {avgTurnAroundTime.toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default FinalTable;
