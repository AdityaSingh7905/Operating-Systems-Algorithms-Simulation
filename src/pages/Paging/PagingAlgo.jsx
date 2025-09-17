import { Link } from "react-router-dom";

const algorithms = [
  { name: "First IN First OUT (FIFO)", path: "/paging/fifo" },
  { name: "Optimal Policy", path: "/paging/op" },
  {
    name: "Least Recently Used (LRU)",
    path: "/paging/lru",
  },
  { name: "Most Recently Used (MRU)", path: "/paging/mru" },
  { name: "Least Frequently Used (LFU)", path: "/paging/lfu" },
  { name: "Most Frequently Used (MFU)", path: "/paging/mfu" },
];

const PagingAlgo = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      {/* bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] */}
      <div className="w-full max-w-3xl px-4 py-12 text-center">
        <h1 className="text-4xl font-bold mb-8">Page Replacement Algorithms</h1>

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

export default PagingAlgo;
