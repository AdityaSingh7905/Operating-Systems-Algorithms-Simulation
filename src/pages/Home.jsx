import { Link } from "react-router-dom";
import FeedbackForm from "../utils/FeedbackForm";

const algorithms = [
  { name: "CPU Scheduling Algorithms", path: "/cpu-scheduling" },
  { name: "Page Replacement Algorithms", path: "/paging" },
  { name: "Deadlock Algorithms", path: "/deadlock" },
  { name: "Disk Scheduling Algorithms", path: "/disk-scheduling" },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-between">
      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-3xl px-4 py-12 text-center">
          <h1 className="text-4xl font-bold mb-8">
            Operating Systems Algorithms
          </h1>

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

      {/* Footer Section */}
      <footer className="bg-gray-800 py-6 mt-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Personal Info */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Created by Aditya Singh</h2>
            <p>
              Email:{" "}
              <a
                href="mailto:anshumansingh8825@gmail.com"
                className="text-blue-400"
              >
                anshumansingh8825@gmail.com
              </a>
            </p>
            <p>
              Connect with Me:{" "}
              <a
                href="https://github.com/AdityaSingh7905"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400"
              >
                GitHub
              </a>{" "}
              |{" "}
              <a
                href="https://www.linkedin.com/in/aditya-singh-28b450235"
                target="_blank"
                rel="noreferrer"
                className="text-blue-400"
              >
                LinkedIn
              </a>
            </p>
          </div>

          {/* Feedback Form */}
          <FeedbackForm />
        </div>
      </footer>
    </div>
  );
};

export default Home;
