import React, { useContext, useState, useEffect } from "react";
import { SimulationContext } from "../../context/SimulationContext";
import ProcessForm from "../../components/CPUScheduling/ProcessForm";
import ProcessQueue from "../../components/CPUScheduling/ProcessQueue";
import CPUSimulator from "../../components/CPUScheduling/CPUSimulator";
import GanttChart from "../../components/CPUScheduling/GanttChart";
import ProcessTable from "../../components/CPUScheduling/ProcessTable";
import FinalTable from "../../components/CPUScheduling/FinalTable";
import SRTFScheduling from "../../algo/CPUScheduling/SRTF";

const SRTFPage = () => {
  const {
    processes,
    setProcesses,
    readyQueue,
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
    await SRTFScheduling(
      processes,
      setProcesses,
      readyQueue,
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
          <ProcessForm />
          <ProcessTable />
        </div>

        {/* Right Section */}
        <div className="lg:w-3/5 w-full space-y-6">
          <ProcessQueue isPreemption={true} />
          <CPUSimulator
            onHandleRunSimulation={handleRunSimulation}
            isRunning={isRunning}
          />
          <GanttChart />
        </div>
      </div>
      <FinalTable />
    </div>
  );
};

export default SRTFPage;
