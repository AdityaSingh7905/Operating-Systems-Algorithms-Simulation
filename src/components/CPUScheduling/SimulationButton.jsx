const SimulationButton = ({ onHandleRunSimulation, isRunning, processes }) => {
  return (
    <button
      onClick={onHandleRunSimulation}
      disabled={isRunning || processes.length === 0}
      className={`mt-6 px-6 py-3 text-white rounded ${
        isRunning || processes.length === 0
          ? "bg-gray-500 cursor-not-allowed"
          : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      {isRunning ? "Simulation Running..." : "▶️ Start Simulation"}
    </button>
  );
};

export default SimulationButton;
