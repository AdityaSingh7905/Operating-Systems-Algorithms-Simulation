const PagingNavigation = ({
  snapshots,
  currentStepIndex,
  pageFaults,
  handlePrev,
  handleNext,
}) => {
  return (
    <div className="flex gap-4 mt-8">
      <button
        onClick={handlePrev}
        disabled={currentStepIndex <= 1}
        className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded disabled:opacity-50"
      >
        ⬅️ Previous
      </button>
      <button
        onClick={handleNext}
        disabled={currentStepIndex >= snapshots.length}
        className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded disabled:opacity-50"
      >
        Next ➡️
      </button>
    </div>
  );
};

export default PagingNavigation;
