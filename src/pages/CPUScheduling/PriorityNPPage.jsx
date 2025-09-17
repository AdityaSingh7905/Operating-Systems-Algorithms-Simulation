import React, { useContext, useState, useEffect } from "react";
import { SimulationContext } from "../../context/SimulationContext";
import ProcessForm from "../../components/CPUScheduling/ProcessForm";
import ProcessQueue from "../../components/CPUScheduling/ProcessQueue";
import CPUSimulator from "../../components/CPUScheduling/CPUSimulator";
import GanttChart from "../../components/CPUScheduling/GanttChart";
import ProcessTable from "../../components/CPUScheduling/ProcessTable";
import FinalTable from "../../components/CPUScheduling/FinalTable";
import PriorityNPScheduling from "../../algo/CPUScheduling/PriorityNP";

const PriorityNPPage = () => {
  const {
    processes,
    setProcesses,
    setReadyQueue,
    setActiveProcess,
    setCompletedProcesses,
    setGanttData,
    setFinalTable,
  } = useContext(SimulationContext);

  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setActiveProcess(null);
    setProcesses([]);
    setReadyQueue([]);
    setCompletedProcesses([]);
    setGanttData([]);
    setFinalTable([]);
  }, []);

  const handleRunSimulation = async () => {
    setIsRunning(true);
    setCompletedProcesses([]);
    setActiveProcess(null);
    setGanttData([]);
    await PriorityNPScheduling(
      processes,
      setProcesses,
      setReadyQueue,
      setActiveProcess,
      setCompletedProcesses,
      setGanttData,
      setFinalTable
    );
    setIsRunning(false);
  };

  return (
    <div className="p-4 bg-gray-900 min-h-screen text-white">
      <div className="flex flex-col lg:flex-row mb-4 gap-6">
        {/* Left Section */}
        <div className="lg:w-2/5 w-full space-y-4">
          <ProcessForm isPriority={true} />
          <ProcessTable isPriority={true} />
        </div>

        {/* Right Section */}
        <div className="lg:w-3/5 w-full space-y-6">
          <ProcessQueue />
          <CPUSimulator
            onHandleRunSimulation={handleRunSimulation}
            isRunning={isRunning}
          />
          <GanttChart />
        </div>
      </div>
      <FinalTable isPriority={true} />
    </div>
  );
};

export default PriorityNPPage;
