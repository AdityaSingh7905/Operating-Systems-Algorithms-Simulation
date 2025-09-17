import Label from "./Label";
import StepCard from "./StepCard";

const Visualization = ({ algo, scrollerRef, idx, steps }) => {
  return (
    <div className="w-full max-w-6xl mt-6">
      <div className="text-sm text-gray-300 mb-2">Timeline</div>
      <div ref={scrollerRef} className="w-full overflow-x-auto py-4">
        <div className="flex gap-4 min-w-max">
          {steps.slice(0, idx).map((s, i) => (
            <StepCard
              key={i}
              idx={i}
              title={algo === "banker" ? `Run P${s.pick}` : `Run P${s.run}`}
              highlight={i === idx - 1}
            >
              <div className="text-xs text-gray-300 mb-2">Total Resources before:</div>
              <div className="flex gap-1 flex-wrap mb-2">
                {s.workBefore.map((v, k) => (
                  <Label key={k}>{v}</Label>
                ))}
              </div>
              <div className="text-xs text-gray-300 mb-2">Total Resources after:</div>
              <div className="flex gap-1 flex-wrap">
                {s.workAfter.map((v, k) => (
                  <Label key={k} intent="ok">
                    {v}
                  </Label>
                ))}
              </div>
              <div className="text-xs text-gray-300 mt-3">
                Finished:{" "}
                {s.finish
                  .map((f, j) => (f ? `P${j}` : null))
                  .filter(Boolean)
                  .join(", ") || "-"}
              </div>
            </StepCard>
          ))}
          {idx === 0 && (
            <div className="text-gray-400 text-sm italic">
              Run the algorithm to populate steps, then use Autoplay/Prev/Next.
            </div>
          )}
          {/* marker to scroll into view */}
          <div data-last="true" />
        </div>
      </div>
    </div>
  );
};

export default Visualization;
