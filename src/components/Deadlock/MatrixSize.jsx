import Section from "./Section";
import NumberInput from "./NumberInput";

const MatrixSize = ({
  n,
  setN,
  m,
  setM,
  loadSampleSafe,
  loadSampleDeadlock,
}) => {
  return (
    <Section title="Matrix Size">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NumberInput
          label="Processes (n)"
          value={n}
          onChange={setN}
          min={1}
          max={10}
        />
        <NumberInput
          label="Resource Types (m)"
          value={m}
          onChange={setM}
          min={1}
          max={8}
        />
        <div className="flex items-center gap-2">
          <button
            onClick={loadSampleSafe}
            className="px-3 py-2 rounded border border-gray-700 bg-gray-800 hover:bg-gray-700"
          >
            Load SAFE sample
          </button>
          <button
            onClick={loadSampleDeadlock}
            className="px-3 py-2 rounded border border-gray-700 bg-gray-800 hover:bg-gray-700"
          >
            Load DEADLOCK sample
          </button>
        </div>
      </div>
    </Section>
  );
};

export default MatrixSize;
