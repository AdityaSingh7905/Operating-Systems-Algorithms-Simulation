import { Link } from "react-router-dom";

const algorithms = [
  { name: "First Come First Serve (FCFS)", path: "/cpu-scheduling/fcfs" },
  { name: "Shortest Job First (SJF)", path: "/cpu-scheduling/sjf" },
  {
    name: "Shortest Remaining Time First - Preemptive SJF",
    path: "/cpu-scheduling/srtf",
  },
  {
    name: "Priority Scheduling - Non Preemptive",
    path: "/cpu-scheduling/priority",
  },
  {
    name: "Priority Scheduling - Preemptive",
    path: "/cpu-scheduling/priority-preemptive",
  },
  { name: "Round Robin Scheduling", path: "/cpu-scheduling/round-robin" },
];

const CPUScheduling = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      {/* bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] */}
      <div className="w-full max-w-3xl px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-8">CPU Scheduling Algorithms</h1>

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

export default CPUScheduling;
