import React, { useContext, useState } from "react";
import { SimulationContext } from "../../context/SimulationContext";

const ProcessForm = ({ isPriority = false }) => {
  const { setProcesses } = useContext(SimulationContext);
  const [input, setInput] = useState({
    id: "",
    arrival: "",
    burst: "",
    remaining: "",
    priority: "",
    completion: "",
    waiting: "",
    turnaround: "",
  });

  const handleSubmit = (e) => {
    console.log("Submit Handler is running!!");
    e.preventDefault();
    if (!input.id || !input.arrival || !input.burst) return;

    if (isPriority && !input.priority) return;

    console.log("id: ", input.id);
    console.log("arrival: ", input.arrival);
    console.log("burst: ", input.burst);

    setProcesses((prev) => [
      ...prev,
      {
        ...input,
        arrival: +input.arrival,
        burst: +input.burst,
        remaining: +input.burst,
        priority: isPriority ? +input.priority : "",
      },
    ]);

    // setReadyQueue((prev) => [
    //   ...prev,
    //   {
    //     ...input,
    //     arrival: +input.arrival,
    //     burst: +input.burst,
    //     remaining: +input.burst,
    //     priority: isPriority ? +input.priority : "",
    //   },
    // ]);

    setInput({
      id: "",
      arrival: "",
      burst: "",
      priority: "",
      remaining: "",
      completion: "",
      waiting: "",
      turnaround: "",
    });

    // onSubmit();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-4 rounded-lg shadow-md space-y-4"
      >
        <h2 className="text-xl font-semibold">➕ Add Process</h2>
        <input
          className="w-full p-2 rounded bg-gray-700"
          value={input.id}
          onChange={(e) => setInput({ ...input, id: e.target.value })}
          placeholder="Process ID (e.g., P1)"
          required
        />
        <input
          className="w-full p-2 rounded bg-gray-700"
          type="number"
          value={input.arrival}
          onChange={(e) => setInput({ ...input, arrival: e.target.value })}
          placeholder="Arrival Time"
          required
        />
        <input
          className="w-full p-2 rounded bg-gray-700"
          type="number"
          value={input.burst}
          onChange={(e) => setInput({ ...input, burst: e.target.value })}
          placeholder="Burst Time"
          required
        />
        {isPriority && (
          <input
            className="w-full p-2 rounded bg-gray-700"
            type="number"
            value={input.priority}
            onChange={(e) => setInput({ ...input, priority: e.target.value })}
            placeholder="Priority"
            required
          />
        )}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded"
        >
          Add
        </button>
      </form>
    </>
  );
};

export default ProcessForm;
