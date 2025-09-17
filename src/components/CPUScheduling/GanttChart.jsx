import React, { useContext } from "react";
import { SimulationContext } from "../../context/SimulationContext";
import { motion } from "framer-motion";

const GanttChart = () => {
  const { ganttData } = useContext(SimulationContext);

  return (
    <div className="bg-gray-800 p-4 rounded-lg mt-4 shadow-md">
      <h2 className="text-lg font-semibold mb-2 text-white">📊 Gantt Chart</h2>
      <div className="flex items-end h-24 overflow-x-auto space-x-2">
        {ganttData.map((block, index) => (
          <motion.div
            key={index}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full bg-green-500 text-white text-center rounded"
            style={{ width: `${(block.end - block.start) * 40}px` }}
          >
            <div className="text-sm mt-1">{block.id}</div>
            <div className="text-xs">{block.start}</div>
            <div className="text-xs">{block.end}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GanttChart;
