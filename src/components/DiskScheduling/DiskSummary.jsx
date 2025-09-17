const DiskSummary = ({
  head,
  currentCylinder,
  currentStep,
  movementSoFar,
  totalMovement,
  sequence,
  nextCylinder,
  distanceToNext,
  isCompleted,
}) => {
  return (
    <>
      <div className="mt-4 flex flex-row justify-between gap-3">
        <div className="p-3 border rounded">
          <div className="text-lg text-white">Current Head Position</div>
          <div className="text-md text-white font-semibold">
            {currentCylinder} (step {currentStep})
          </div>
        </div>

        <div className="p-3 border rounded">
          <div className="text-lg text-white">Movement so far: </div>
          <div className="text-md text-white font-semibold">
            {movementSoFar}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            Next move: {nextCylinder ?? "—"}{" "}
            {nextCylinder ? `(|Δ|=${distanceToNext})` : ""}
          </div>
        </div>
      </div>

      {isCompleted && (
        <div className="mt-3 text-center text-white">
          Final Sequence: {sequence.join(" → ")}
        </div>
      )}
      {isCompleted && (
        <div className="mt-3 text-center text-white">
          Total Movement: {totalMovement}
        </div>
      )}
    </>
  );
};

export default DiskSummary;
