import Label from "./Label";
import PlayButton from "./PlayButton";

const DeadlockSimulation = ({
  algo,
  runBanker = () => {},
  runDetect = () => {},
  safe,
  start,
  safeSeq,
  auto,
  setAuto,
  idx,
  setIdx,
  steps,
  resetPlayback,
}) => {
  return (
    <div className="w-full max-w-6xl flex flex-wrap items-center gap-3 mt-6">
      {algo === "banker" ? (
        <>
          <button
            onClick={runBanker}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
          >
            Start Simulation
          </button>
          {start && (
            <Label intent={safe ? "ok" : "bad"}>
              {safe ? "Safe State" : "Unsafe (No safe sequence)"}
            </Label>
          )}
          {start && safe && (
            <div className="flex items-center gap-2 text-sm">
              <span>Safe sequence:</span>
              <div className="flex gap-2">
                {safeSeq.map((p, i) => (
                  <Label key={i}>P{p}</Label>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <button
            onClick={runDetect}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700"
          >
            Start Simulation
          </button>
          {start && (
            <Label intent={safe ? "ok" : "bad"}>
              {safe ? "No deadlock" : "Deadlock detected"}
            </Label>
          )}
          {start && !safe && (
            <div className="flex items-center gap-2 text-sm">
              <span>Stuck processes:</span>
              <div className="flex gap-2">
                {safeSeq.map((p, i) => (
                  <Label intent="bad" key={i}>
                    P{p}
                  </Label>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      <PlayButton
        auto={auto}
        setAuto={setAuto}
        idx={idx}
        setIdx={setIdx}
        steps={steps}
        resetPlayback={resetPlayback}
      />
    </div>
  );
};

export default DeadlockSimulation;
