import Section from "./Section";
import MatrixTable from "./MatrixTable";
import SafeSequence from "./SafeSequence";
import Label from "./Label";

const FinalTable = ({
  algo,
  available,
  max,
  alloc,
  request = [],
  need = [],
  steps,
  idx,
  safe,
  start,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-6xl mt-6">
      <Section title="Current Matrices">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SafeSequence title="Available" vec={available} />
          <MatrixTable title="Max" data={max} />
          <MatrixTable title="Allocation" data={alloc} />
          {algo === "banker" && <MatrixTable title="Need" data={need} />}
          {algo === "detect" && <MatrixTable title="Request" data={request} />}
        </div>
      </Section>
      <Section title="Status">
        <div className="space-y-2 text-sm">
          <div>
            Steps generated:{" "}
            <span className="font-semibold">{steps.length}</span>
          </div>
          <div>
            Visible steps: <span className="font-semibold">{idx}</span>
          </div>
          <div>
            Mode:{" "}
            <Label>
              {algo === "banker" ? "Banker's (Avoidance)" : "Detection"}
            </Label>
          </div>
          <div>
            State:{" "}
            {start && (
              <Label intent={safe ? "ok" : "bad"}>
                {safe
                  ? algo === "banker"
                    ? "Safe"
                    : "No deadlock"
                  : algo === "banker"
                  ? "Unsafe"
                  : "Deadlock"}
              </Label>
            )}
          </div>
        </div>
      </Section>
    </div>
  );
};

export default FinalTable;
