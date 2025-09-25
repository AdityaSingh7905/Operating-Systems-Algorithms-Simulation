const PagingForm = ({
  referenceString,
  setReferenceString,
  framesCount,
  setFramesCount,
  startSimulation,
  resetSimulation,
  handlePrev,
  handleNext,
  currentStepIndex,
  snapShots,
  isAutoPlaying,
}) => {
  return (
    <div className="w-full max-w-3xl bg-gray-800 rounded-xl shadow p-4 space-y-4 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Page Requests</label>
          <input
            type="text"
            value={referenceString}
            onChange={(e) => setReferenceString(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-900 focus:outline-none"
            placeholder="e.g. 7,0,1,2,0,3..."
            required
            disabled={isAutoPlaying}
          />
        </div>
        <div>
          <label className="block text-sm mb-1">
            Number of Frames (between 2 and 5).
          </label>
          <input
            type="text"
            value={framesCount}
            onChange={(e) => setFramesCount(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-900 focus:outline-none"
            placeholder="e.g. 3"
            required
            disabled={isAutoPlaying}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-3">
        <div className="flex space-x-3 w-full sm:w-auto">
          <button
            onClick={startSimulation}
            disabled={isAutoPlaying}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition w-full sm:w-auto disabled:cursor-not-allowed disabled:bg-gray-600"
          >
            Start
          </button>
          <button
            onClick={resetSimulation}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition w-full sm:w-auto"
          >
            Reset
          </button>
        </div>

        <div className="flex space-x-3 w-full sm:w-auto justify-end">
          <button
            onClick={handlePrev}
            disabled={currentStepIndex <= 1}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded-lg disabled:opacity-50 w-full sm:w-auto"
          >
            ⬅ Prev
          </button>
          <button
            onClick={handleNext}
            disabled={currentStepIndex >= snapShots.length}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg disabled:opacity-50 w-full sm:w-auto"
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
};

export default PagingForm;
