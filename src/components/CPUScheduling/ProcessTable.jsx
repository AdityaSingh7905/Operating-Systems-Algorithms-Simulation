import React, { useContext } from "react";
import { SimulationContext } from "../../context/SimulationContext";

const ProcessTable = ({ isPriority }) => {
  const { processes } = useContext(SimulationContext);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md h-72 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-2">📋 Process Table</h2>
      <table className="min-w-full table-auto border border-gray-300 dark:border-gray-600">
        <thead className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-sm">
          <tr>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
              ID
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
              Arrival
            </th>
            <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
              Burst
            </th>
            {isPriority && (
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Priority
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {processes.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center py-4 text-gray-500 dark:text-gray-300"
              >
                No processes added.
              </td>
            </tr>
          ) : (
            processes.map((proc, index) => (
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
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProcessTable;
