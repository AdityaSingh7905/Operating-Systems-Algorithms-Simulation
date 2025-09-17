import { motion } from "framer-motion";

const StepCard = ({ idx, title, children, highlight }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-xl border p-4 w-72 shrink-0 ${
        highlight
          ? "border-blue-500 bg-blue-500/10"
          : "border-gray-700 bg-gray-800/40"
      }`}
    >
      <div className="text-sm text-gray-300 mb-2">
        <span className="font-semibold text-white">Step {idx + 1}:</span>{" "}
        {title}
      </div>
      {children}
    </motion.div>
  );
};

export default StepCard;
