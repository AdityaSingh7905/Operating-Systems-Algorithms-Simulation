import { useEffect, useState } from "react";
import { parseRequests } from "../../utils/DiskUtils";

import DiskInput from "../../components/DiskScheduling/DiskInput";
import DiskSimulation from "../../components/DiskScheduling/DiskSimulation";
import DiskGraphPlot from "../../components/DiskScheduling/DiskGraphPlot";
import DiskSummary from "../../components/DiskScheduling/DiskSummary";

import { look } from "../../algo/DiskScheduling/LOOK";

export default function DiskLOOKPage() {
  const [requestsInput, setRequestsInput] = useState("82,170,43,140,24,16,190");
  const [head, setHead] = useState("50");
  const [requests, setRequests] = useState([]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [sequence, setSequence] = useState([]);
  const [totalMovement, setTotalMovement] = useState(0);

  // const requests = parseRequests(requestsInput);

  const runAlgo = () => {
    if (head.trim().length === 0) {
      alert("Please enter a valid head pointer!!");
      return;
    }
    let headInt = Number(head);
    if (Number.isNaN(headInt) || headInt < 0 || headInt > 199) {
      alert("please enter a valid head pointer!!");
      return;
    }
    const req = parseRequests(requestsInput);
    // console.log("Requests: ", req);

    if (req.length === 0) {
      alert("Please enter a valid request input!!");
      return;
    }

    setRequests(req);

    const { sequence, totalMovement } = look(Number(head), req);
    setSequence(sequence);
    setTotalMovement(totalMovement);

    setCurrentStep(0);
    setIsPlaying(true);
    setIsStart(true);
    setIsCompleted(false);
  };

  const data =
    sequence.length > 0
      ? sequence.map((cylinder, index) => ({
          step: index,
          cylinder: cylinder,
        }))
      : [];

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= sequence.length - 1) {
          setIsPlaying(false);
          setIsStart(false);
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
    setIsStart(false);

    setSequence([]);
    setTotalMovement(0);
  };

  const togglePlay = () => {
    if (!isStart) {
      return;
    }
    setIsPlaying((p) => !p);
  };

  const movementSoFar = sequence
    .slice(0, currentStep + 1)
    .reduce((acc, cur, i, arr) => {
      if (i === 0) return 0;
      return acc + Math.abs(cur - arr[i - 1]);
    }, 0);

  const currentCylinder =
    data[Math.min(currentStep, data.length - 1)]?.cylinder ?? Number(head);

  const nextCylinder = data[currentStep + 1]?.cylinder;

  const distanceToNext =
    nextCylinder !== undefined ? Math.abs(nextCylinder - currentCylinder) : 0;

  const completedData = data.slice(0, currentStep + 1);

  return (
    <div className="min-h-screen bg-gray-900 px-24 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">
        LOOK Disk Scheduling Algorithm
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              isStart={isStart}
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

        <div className="bg-gray-800 rounded shadow p-4">
          <DiskGraphPlot
            completedData={
              completedData.length
                ? completedData
                : [{ step: 0, cylinder: Number(head) }]
            }
            data={data.length ? data : [{ step: 0, cylinder: Number(head) }]}
            currentStep={currentStep}
          />
        </div>
      </div>
    </div>
  );
}
