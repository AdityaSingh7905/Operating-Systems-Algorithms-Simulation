const PagingForm = ({
  referenceString,
  setReferenceString,
  framesCount,
  setFramesCount,
  startSimulation,
}) => {
  return (
    <div className="flex flex-col items-center space-y-4 mb-10 w-full max-w-xl">
      <div className="w-full flex flex-row items-center space-x-4">
        <label className="text-lg whitespace-nowrap w-56">
          🔢 Page Reference String
        </label>
        <input
          type="text"
          placeholder="e.g. 7 0 1 2 0 3"
          className="p-2 rounded bg-gray-800 border border-gray-600 text-white flex-1"
          value={referenceString}
          onChange={(e) => setReferenceString(e.target.value)}
        />
      </div>

      <div className="w-full flex flex-row items-center space-x-4">
        <label className="text-lg whitespace-nowrap w-56">
          📦 Number of Frames
        </label>
        <input
          type="number"
          placeholder="e.g. 3"
          min={1}
          max={5}
          className="p-2 rounded bg-gray-800 border border-gray-600 text-white flex-1"
          value={framesCount}
          onChange={(e) => setFramesCount(parseInt(e.target.value))}
        />
      </div>

      <button
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded w-fit mt-4"
        onClick={startSimulation}
      >
        ▶️ Start Simulation
      </button>
    </div>
  );
};

export default PagingForm;
