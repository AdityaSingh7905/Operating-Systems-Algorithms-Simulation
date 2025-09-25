import { useState, useEffect, useRef } from "react";
import PagingForm from "../../components/Paging/PagingForm";
import PagingSnapshots from "../../components/Paging/PagingSnapshots";
import PagingSummary from "../../components/Paging/PagingSummary";

import { LFU } from "../../algo/Paging/LFU";
import { parseRequests } from "../../utils/DiskUtils";

const LFUPagingSimulator = () => {
  const [referenceString, setReferenceString] = useState(
    "1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5"
  );
  const [framesCount, setFramesCount] = useState("3");

  const [snapshots, setSnapshots] = useState([]);
  const [pageFaults, setPageFaults] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const lastSnapRef = useRef(null);

  const startSimulation = () => {
    if (framesCount.trim().length === 0) {
      alert("Please enter a valid frame number (between 2 and 5).");
      return;
    }
    let frame = Number(framesCount);
    if (Number.isNaN(frame) || frame < 2 || frame > 5) {
      alert("please enter a valid frame number (between 2 and 5).");
      return;
    }

    const req = parseRequests(referenceString);
    // console.log("Requests: ", req);

    if (req.length === 0) {
      alert("Please enter a valid page requests!!");
      return;
    }

    LFU(req, Number(framesCount), setSnapshots, setPageFaults);
    setCurrentStepIndex(0);
    setIsComplete(false);
    setIsAutoPlaying(true);
  };

  const resetSimulation = () => {
    setReferenceString("1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5");
    setFramesCount("3");

    setSnapshots([]);
    setIsAutoPlaying(false);
    setIsComplete(false);
  };

  useEffect(() => {
    if (lastSnapRef.current) {
      lastSnapRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [currentStepIndex]);

  // autoplay
  useEffect(() => {
    if (!isAutoPlaying) return;
    if (currentStepIndex >= snapshots.length) {
      setIsAutoPlaying(false);
      setIsComplete(true);
      return;
    }
    const timeout = setTimeout(
      () => setCurrentStepIndex((prev) => prev + 1),
      800
    );
    return () => clearTimeout(timeout);
  }, [currentStepIndex, isAutoPlaying, snapshots]);

  const handlePrev = () => {
    // setIsAutoPlaying(false);
    if (currentStepIndex > 0) setCurrentStepIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    // setIsAutoPlaying(false);
    if (currentStepIndex < snapshots.length) {
      setCurrentStepIndex((prev) => prev + 1);
    }
    if (currentStepIndex === snapshots.length - 1) {
      setIsAutoPlaying(false);
      setIsComplete(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-center">
        LFU Page Replacement Simulator
      </h1>

      <PagingForm
        referenceString={referenceString}
        setReferenceString={setReferenceString}
        framesCount={framesCount}
        setFramesCount={setFramesCount}
        startSimulation={startSimulation}
        resetSimulation={resetSimulation}
        handlePrev={handlePrev}
        handleNext={handleNext}
        currentStepIndex={currentStepIndex}
        snapShots={snapshots}
        isAutoPlaying={isAutoPlaying}
      />

      <PagingSnapshots
        snapshots={snapshots}
        currentStepIndex={currentStepIndex}
        framesCount={Number(framesCount)}
        lastSnapRef={lastSnapRef}
      />

      {isComplete && snapshots.length > 0 && (
        <PagingSummary
          totalRequests={snapshots.length}
          pageFaults={pageFaults}
        />
      )}
    </div>
  );
};

export default LFUPagingSimulator;
