import { Link } from "react-router-dom";

const algorithms = [
  {
    name: "Deadlock Avoidance (Banker's Algorithm)",
    path: "/deadlock-avoidance",
  },
  { name: "Deadlock Detection", path: "/deadlock-detection" },
];

const DeadlocksAlgo = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      {/* bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] */}
      <div className="w-full max-w-3xl px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-8">Deadlock Algorithms</h1>

        <div className="space-y-6">
          {algorithms.map((algo, index) => (
            <Link
              key={index}
              to={algo.path}
              className="block bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl py-4 px-6 text-lg font-medium transition duration-300 hover:scale-105"
            >
              {algo.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeadlocksAlgo;
