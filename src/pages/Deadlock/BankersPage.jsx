import { useRef, useState, useEffect } from "react";

import Header from "../../components/Deadlock/Header";
import FinalTable from "../../components/Deadlock/FinalTable";
import Visualization from "../../components/Deadlock/Visualization";
import MatrixSize from "../../components/Deadlock/MatrixSize";
import MatrixFilling from "../../components/Deadlock/MatrixFilling";
import DeadlockSimulation from "../../components/Deadlock/DeadlockSimulation";

import useResourceParser from "../../hooks/useParser";

import Bankers from "../../algo/Deadlock/Bankers";

export default function BankersPage() {
  // Problem size
  const [n, setN] = useState(5); // processes
  const [m, setM] = useState(3); // resource types

  // Raw text inputs
  const [availableTxt, setAvailableTxt] = useState("3 3 2");
  const [maxTxt, setMaxTxt] = useState(`7 5 3\n3 2 2\n9 0 2\n2 2 2\n4 3 3`);
  const [allocTxt, setAllocTxt] = useState(`0 1 0\n2 0 0\n3 0 2\n2 1 1\n0 0 2`);
  const [requestTxt, setRequestTxt] = useState(
    `0 0 0\n0 0 0\n0 0 0\n0 0 0\n0 0 0`
  );

  //Parsed matrix
  const { available, max, alloc } = useResourceParser({
    availableTxt,
    maxTxt,
    allocTxt,
    n,
    m,
  });

  // Results & steps
  const [safe, setSafe] = useState(false);
  const [start, setStart] = useState(false);
  const [safeSeq, setSafeSeq] = useState([]); // for banker
  const [need, setNeed] = useState([]);
  const [steps, setSteps] = useState([]);

  // Playback
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(false);
  const scrollerRef = useRef(null);

  useEffect(() => {
    if (!auto) return;
    if (idx >= steps.length) return;
    const t = setTimeout(() => setIdx((p) => p + 1), 900);
    return () => clearTimeout(t);
  }, [auto, idx, steps.length]);

  useEffect(() => {
    // Auto-scroll last step into view
    if (!scrollerRef.current) return;
    const last = scrollerRef.current.querySelector("[data-last='true']");
    if (last)
      last.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
  }, [idx]);

  // Actions
  const runBanker = () => {
    const { safe, sequence, steps, need } = Bankers(max, alloc, available);
    setSafe(safe);
    setStart(true);
    setSafeSeq(sequence);
    setNeed(need);
    setSteps(steps);
    setIdx(0);
    setAuto(true);
  };

  const resetPlayback = () => {
    setIdx(0);
    setAuto(false);
    setSafe(false);
    setStart(false);
    setSafeSeq([]);
    setNeed([]);
    setSteps([]);
  };

  const loadSampleSafe = () => {
    setN(5);
    setM(3);
    setAvailableTxt("3 3 2");
    setMaxTxt(`7 5 3\n3 2 2\n9 0 2\n2 2 2\n4 3 3`);
    setAllocTxt(`0 1 0\n2 0 0\n3 0 2\n2 1 1\n0 0 2`);
    setRequestTxt(`0 0 0\n0 0 0\n0 0 0\n0 0 0\n0 0 0`);
  };
  const loadSampleDeadlock = () => {
    setN(3);
    setM(3);
    setAvailableTxt("0 0 0");
    setAllocTxt(`1 0 0\n0 1 0\n0 0 1`);
    setRequestTxt(`0 1 0\n0 0 1\n1 0 0`); // simple cycle
    setMaxTxt(`1 1 0\n0 1 1\n1 0 1`);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4 flex flex-col items-center">
      <Header algo="Banker's Algorithm" />

      {/* taking input of process size and resources size from the user */}
      <MatrixSize
        n={n}
        setN={setN}
        m={m}
        setM={setM}
        loadSampleSafe={loadSampleSafe}
        loadSampleDeadlock={loadSampleDeadlock}
      />

      {/* Now, Taking input in order to fill Available resources and,
       Max resources required by each process and,
       Allocated resources to each process */}
      <MatrixFilling
        n={n}
        m={m}
        availableTxt={availableTxt}
        setAvailableTxt={setAvailableTxt}
        maxTxt={maxTxt}
        setMaxTxt={setMaxTxt}
        allocTxt={allocTxt}
        setAllocTxt={setAllocTxt}
        requestTxt={requestTxt}
        setRequestTxt={setRequestTxt}
        need={need}
        algo="banker"
      />

      <DeadlockSimulation
        algo="banker"
        runBanker={runBanker}
        safe={safe}
        start={start}
        safeSeq={safeSeq}
        auto={auto}
        setAuto={setAuto}
        idx={idx}
        setIdx={setIdx}
        steps={steps}
        resetPlayback={resetPlayback}
      />

      {/* Visualization */}
      <Visualization
        algo="banker"
        scrollerRef={scrollerRef}
        idx={idx}
        steps={steps}
      />

      {/* Live tables */}
      <FinalTable
        algo="banker"
        available={available}
        max={max}
        alloc={alloc}
        need={need}
        steps={steps}
        idx={idx}
        safe={safe}
        start={start}
      />
    </div>
  );
}
