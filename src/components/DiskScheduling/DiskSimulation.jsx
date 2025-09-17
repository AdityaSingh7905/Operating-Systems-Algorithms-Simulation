const DiskSimulation = ({ runAlgo, togglePlay, isPlaying, resetAnimation }) => {
  return (
    <div className="flex justify-between items-center gap-3 mt-2">
      <button
        onClick={runAlgo}
        className="px-3 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
      >
        Start Simulation
      </button>

      <div className="flex items-center gap-3">
        <button
          onClick={togglePlay}
          className="px-4 py-2 rounded border bg-white hover:bg-gray-50"
        >
          {isPlaying ? "Pause" : "Start"}
        </button>

        <button
          onClick={resetAnimation}
          className="px-4 py-2 rounded border bg-white hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default DiskSimulation;
