import React, { useContext, useRef } from "react";
import { SimulationContext } from "../../context/SimulationContext";
import FCFSScheduling from "../../algo/CPUScheduling/FCFS";

export default function ControlPanel() {
  const {
    processes,
    setGanttData,
    setTime,
    setIsRunning,
    setIsPaused,
    isPaused,
    isRunning,
    speed,
    setSpeed,
  } = useContext(SimulationContext);

  const intervalRef = useRef();

  const runFCFS = () => {
    const schedule = FCFSScheduling(processes);
    setGanttData(schedule);
    setTime(0);
    setIsPaused(false);
    setIsRunning(true);

    let maxTime = schedule[schedule.length - 1]?.end || 0;
    let current = 0;

    intervalRef.current = setInterval(() => {
      if (!isPaused) {
        setTime((prev) => {
          current = prev + 1;
          if (current > maxTime) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
          }
          return current;
        });
      }
    }, speed);
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  const handleSpeedChange = (e) => {
    setSpeed(Number(e.target.value));
  };

  return (
    <div className="mt-4 bg-gray-800 p-4 rounded-lg space-y-3">
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 p-2 rounded"
        onClick={runFCFS}
        disabled={isRunning}
      >
        ▶️ Start FCFS
      </button>

      {isRunning && (
        <button
          className="w-full bg-yellow-500 hover:bg-yellow-600 p-2 rounded"
          onClick={togglePause}
        >
          {isPaused ? "⏯ Resume" : "⏸ Pause"}
        </button>
      )}

      <div>
        <label className="block text-sm mb-1">
          ⚡ Speed (ms per time unit)
        </label>
        <select
          onChange={handleSpeedChange}
          value={speed}
          className="w-full p-2 bg-gray-700 rounded"
        >
          <option value={2000}>Slow (2000ms)</option>
          <option value={1000}>Normal (1000ms)</option>
          <option value={500}>Fast (500ms)</option>
          <option value={250}>Very Fast (250ms)</option>
        </select>
      </div>
    </div>
  );
}
