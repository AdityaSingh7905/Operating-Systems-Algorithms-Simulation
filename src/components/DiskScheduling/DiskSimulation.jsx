const DiskSimulation = ({
  runAlgo,
  togglePlay,
  isPlaying,
  isStart,
  resetAnimation,
}) => {
  return (
    <div className="flex justify-between items-center gap-3 mt-2">
      <button
        onClick={runAlgo}
        disabled={isStart}
        className="px-3 py-2 font-semibold text-white rounded cursor-pointer bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
      >
        Start
      </button>

      <div className="flex items-center gap-3">
        {isStart && (
          <button
            onClick={togglePlay}
            className="px-4 py-2 font-semibold text-white rounded cursor-pointer bg-indigo-600 hover:bg-indigo-700"
          >
            {isPlaying ? "Pause" : "Resume"}
          </button>
        )}

        <button
          onClick={resetAnimation}
          disabled={isStart}
          className="px-4 py-2 text-white font-semibold rounded cursor-pointer bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default DiskSimulation;
