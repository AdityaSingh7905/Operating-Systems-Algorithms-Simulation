import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SimulationContext } from "../../context/SimulationContext";

const ProcessQueue = ({ isPreemption = false }) => {
  const { processes, activeProcess, readyQueue } =
    useContext(SimulationContext);

  return (
    <div className="w-full flex justify-between items-center gap-10 p-6">
      <div className="w-1/3 border p-4 rounded-xl shadow bg-gray-50 dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-4 text-center text-white">
          Process Queue
        </h2>
        <div className="flex gap-2 flex-wrap justify-center">
          <AnimatePresence>
            {processes.length > 0 ? (
              processes.map((process) => (
                <motion.div
                  key={process.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {process.id}
                </motion.div>
              ))
            ) : (
              <p className="mx-auto text-white">Queue is empty!!</p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="w-1/3 border p-4 rounded-xl shadow bg-gray-50 dark:bg-gray-800">
        <h2 className="text-lg font-semibold mb-4 text-center text-white">
          Ready Queue
        </h2>
        <div className="flex gap-2 flex-wrap justify-center">
          <AnimatePresence>
            {readyQueue.length > 0 ? (
              readyQueue.map((process) => (
                <motion.div
                  key={process.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  {process.id}
                </motion.div>
              ))
            ) : (
              <p className="mx-auto text-white">Queue is empty!!</p>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* CPU Display */}
      <div className="w-1/3 flex flex-col items-center justify-center border p-4 rounded-xl shadow bg-gray-100 dark:bg-gray-700">
        <h2 className="text-lg font-semibold mb-4 text-white">CPU</h2>
        <div className="flex flex-col items-center gap-4">
          {activeProcess ? (
            <>
              <motion.div
                key={activeProcess.id}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-green-500 text-white px-6 py-3 rounded-full shadow-lg"
              >
                {activeProcess.id}
              </motion.div>

              <div className="w-40 h-2 bg-gray-300 rounded overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeProcess.id}
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: activeProcess.end - activeProcess.start,
                      ease: "linear",
                    }}
                    className="h-full bg-blue-500"
                  />
                </AnimatePresence>
              </div>
            </>
          ) : (
            <div className="text-gray-400">I'm happy now!! 😊</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessQueue;
