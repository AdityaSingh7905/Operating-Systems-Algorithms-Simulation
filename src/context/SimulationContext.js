import React, { createContext, useState } from "react";

export const SimulationContext = createContext();

export const SimulationProvider = ({ children }) => {
  const [processes, setProcesses] = useState([]);
  const [ganttData, setGanttData] = useState([]);
  const [activeProcess, setActiveProcess] = useState(null);
  const [completedProcesses, setCompletedProcesses] = useState([]);

  const [finalTable, setFinalTable] = useState([]);
  const [avgWaitingTime, setAvgWaitingTime] = useState(0);
  const [avgTurnAroundTime, setAvgTurnAroundTime] = useState(0);

  const [readyQueue, setReadyQueue] = useState([]);

  return (
    <SimulationContext.Provider
      value={{
        processes,
        setProcesses,
        ganttData,
        setGanttData,
        activeProcess,
        setActiveProcess,
        completedProcesses,
        setCompletedProcesses,
        finalTable,
        setFinalTable,
        avgTurnAroundTime,
        setAvgTurnAroundTime,
        avgWaitingTime,
        setAvgWaitingTime,
        readyQueue,
        setReadyQueue,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};
