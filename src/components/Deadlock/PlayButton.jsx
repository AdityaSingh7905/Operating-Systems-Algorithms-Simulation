const PlayButton = ({ auto, setAuto, idx, setIdx, steps, resetPlayback }) => {
  return (
    <div className="ml-auto flex items-center gap-2">
      <button
        onClick={() => setAuto((a) => !a)}
        className={`px-3 py-2 rounded border ${
          auto
            ? "border-blue-500 bg-blue-500/20"
            : "border-gray-700 bg-gray-800 hover:bg-gray-700"
        }`}
      >
        {auto ? "Pause" : "Autoplay"}
      </button>
      <button
        onClick={() => {
          setIdx((i) => Math.max(0, i - 1));
          setAuto(false);
        }}
        disabled={idx <= 0}
        className="px-3 py-2 rounded border border-gray-700 bg-gray-800 disabled:opacity-40"
      >
        Prev
      </button>
      <button
        onClick={() => {
          setIdx((i) => Math.min(steps.length, i + 1));
          setAuto(false);
        }}
        disabled={idx >= steps.length}
        className="px-3 py-2 rounded border border-gray-700 bg-gray-800 disabled:opacity-40"
      >
        Next
      </button>
      <button
        onClick={resetPlayback}
        className="px-3 py-2 rounded border border-gray-700 bg-gray-800"
      >
        Reset
      </button>
    </div>
  );
};

export default PlayButton;
