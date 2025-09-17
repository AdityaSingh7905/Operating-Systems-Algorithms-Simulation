import { useEffect, useState } from "react";
import { parseRequests } from "../../utils/DiskUtils";

import DiskInput from "../../components/DiskScheduling/DiskInput";
import DiskSimulation from "../../components/DiskScheduling/DiskSimulation";
import DiskGraphPlot from "../../components/DiskScheduling/DiskGraphPlot";
import DiskSummary from "../../components/DiskScheduling/DiskSummary";

import { sstf } from "../../algo/DiskScheduling/SSTF";

export default function DiskSSTFPage() {
  const [requestsInput, setRequestsInput] = useState("82,170,43,140,24,16,190");
  const [head, setHead] = useState(50);
  const [requests, setRequests] = useState([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  // const requests = parseRequests(requestsInput);

  const runAlgo = () => {
    const req = parseRequests(requestsInput);
    if (req.length === 0) return;
    setRequests(req);
    setCurrentStep(0);
    setIsPlaying(true);
    setIsCompleted(false);
  };

  const { sequence, totalMovement } = sstf(head, requests);
  const data = sequence.map((cylinder, index) => ({ step: index, cylinder }));

  useEffect(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, [head, requestsInput]);

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= sequence.length - 1) {
          setIsPlaying(false);
          setIsCompleted(true);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isPlaying, sequence]);

  const resetAnimation = () => {
    setCurrentStep(0);
    setIsPlaying(false);
    setIsCompleted(false);
  };

  const togglePlay = () => {
    if (currentStep >= sequence.length - 1) setCurrentStep(0);
    setIsPlaying((p) => !p);
  };

  const movementSoFar = sequence
    .slice(0, currentStep + 1)
    .reduce((acc, cur, i, arr) => {
      if (i === 0) return 0;
      return acc + Math.abs(cur - arr[i - 1]);
    }, 0);

  const currentCylinder =
    data[Math.min(currentStep, data.length - 1)]?.cylinder ?? head;
  const nextCylinder = data[currentStep + 1]?.cylinder;
  const distanceToNext =
    nextCylinder !== undefined ? Math.abs(nextCylinder - currentCylinder) : 0;

  // The line only follows head up to current step (no jumping ahead)
  const completedData = data.slice(0, currentStep + 1);

  return (
    <div className="min-h-screen bg-gray-900 px-24 py-8">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        SSTF Disk Scheduling Algorithm
      </h1>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column → input + simulation buttons + summary */}
        <div className="space-y-6">
          <div className="bg-gray-800 rounded shadow p-4">
            <DiskInput
              head={head}
              setHead={setHead}
              requestsInput={requestsInput}
              setRequestsInput={setRequestsInput}
            />

            <DiskSimulation
              runAlgo={runAlgo}
              togglePlay={togglePlay}
              isPlaying={isPlaying}
              resetAnimation={resetAnimation}
            />
          </div>

          <div className="bg-gray-800 rounded shadow p-4">
            <DiskSummary
              head={head}
              currentCylinder={currentCylinder}
              currentStep={currentStep}
              movementSoFar={movementSoFar}
              totalMovement={totalMovement}
              sequence={sequence}
              nextCylinder={nextCylinder}
              distanceToNext={distanceToNext}
              isCompleted={isCompleted}
            />
          </div>
        </div>

        {/* Right column → graph */}
        <div className="bg-gray-800 rounded shadow p-4">
          <DiskGraphPlot
            completedData={completedData}
            data={data}
            currentStep={currentStep}
          />
        </div>
      </div>
    </div>
  );
}
