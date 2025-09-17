import Section from "./Section";
import VectorInput from "./VectorInput";
import TextAreaMatrix from "./TextAreaMatrix";
import MatrixTable from "./MatrixTable";

const MatrixFilling = ({
  n,
  m,
  availableTxt,
  setAvailableTxt,
  maxTxt,
  setMaxTxt,
  allocTxt,
  setAllocTxt,
  requestTxt,
  setRequestTxt,
  algo,
  need,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 w-full max-w-6xl">
      <Section title="Available">
        <VectorInput
          label={`Available [${m}]`}
          value={availableTxt}
          onChange={setAvailableTxt}
          placeholder="e.g. 3 3 2"
        />
      </Section>
      <Section title="Max (n x m)">
        <TextAreaMatrix
          label={`Max [${n} x ${m}]`}
          value={maxTxt}
          onChange={setMaxTxt}
          placeholder={`Each row per line, e.g.\n7 5 3\n3 2 2`}
        />
      </Section>
      <Section title="Allocation (n x m)">
        <TextAreaMatrix
          label={`Allocation [${n} x ${m}]`}
          value={allocTxt}
          onChange={setAllocTxt}
          placeholder={`Each row per line, e.g.\n0 1 0\n2 0 0`}
        />
      </Section>
      {algo === "detect" ? (
        <Section title="Request (n x m)">
          <TextAreaMatrix
            label={`Request [${n} x ${m}]`}
            value={requestTxt}
            onChange={setRequestTxt}
            placeholder={`Each row per line, e.g.\n0 1 0\n0 0 1`}
          />
        </Section>
      ) : (
        <Section title="Need (computed)">
          <MatrixTable title="Need = Max - Allocation" data={need} />
        </Section>
      )}
    </div>
  );
};

export default MatrixFilling;
