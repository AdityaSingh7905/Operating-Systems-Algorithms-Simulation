import { useState, useEffect, useRef } from "react";
import PagingForm from "../../components/Paging/PagingForm";
import PagingSnapshots from "../../components/Paging/PagingSnapshots";
import PagingNavigation from "../../components/Paging/PagingNavigation";

import { MRU } from "../../algo/Paging/MRU";

const MRUPagingSimulator = () => {
  const [referenceString, setReferenceString] = useState("");
  const [framesCount, setFramesCount] = useState("");
  const [snapshots, setSnapshots] = useState([]);
  const [pageFaults, setPageFaults] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const lastSnapRef = useRef(null);

  const startSimulation = () => {
    MRU(referenceString, framesCount, setSnapshots, setPageFaults);

    setCurrentStepIndex(0);
    setIsComplete(false);
    setIsAutoPlaying(true);
  };

  useEffect(() => {
    if (lastSnapRef.current) {
      lastSnapRef.current.scrollIntoView({
        behavior: "smooth",
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
    setIsAutoPlaying(false);
    if (currentStepIndex > 0) setCurrentStepIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    if (currentStepIndex < snapshots.length)
      setCurrentStepIndex((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8 text-center">
        MRU Page Replacement Simulator
      </h1>

      {/* Paging Form */}
      <PagingForm
        referenceString={referenceString}
        setReferenceString={setReferenceString}
        framesCount={framesCount}
        setFramesCount={setFramesCount}
        startSimulation={startSimulation}
      />

      {/* Snapshots */}
      <PagingSnapshots
        snapshots={snapshots}
        currentStepIndex={currentStepIndex}
        framesCount={framesCount}
        lastSnapRef={lastSnapRef}
      />

      {/* Navigation + Page Faults */}
      {snapshots.length > 0 && isComplete && (
        <PagingNavigation
          snapshots={snapshots}
          currentStepIndex={currentStepIndex}
          pageFaults={pageFaults}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      )}
    </div>
  );
};

export default MRUPagingSimulator;
