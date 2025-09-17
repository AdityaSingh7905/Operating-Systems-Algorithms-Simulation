import { motion } from "framer-motion";
import { useContext } from "react";
import { SimulationContext } from "../../context/SimulationContext";
import SimulationButton from "./SimulationButton";

const CPUSimulator = ({ onHandleRunSimulation, isRunning }) => {
  const { processes, activeProcess } = useContext(SimulationContext);

  return (
    <div className="flex flex-col items-center mt-6 space-y-4 relative">
      {/* Spinning outer circle when activeProcess exists */}
      <motion.div
        className="w-36 h-36 rounded-full flex items-center justify-center shadow-lg bg-gray-800 text-white relative overflow-hidden"
        animate={activeProcess ? { rotate: 360 } : { rotate: 0 }}
        transition={
          activeProcess
            ? {
                repeat: Infinity,
                ease: "linear",
                duration: 2,
              }
            : {}
        }
      >
        {/* Radar pulse animation */}
        {activeProcess && (
          <>
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-full h-full border-2 border-blue-500 rounded-full"
                initial={{ scale: 0.5, opacity: 0.6 }}
                animate={{ scale: 1.5, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: i * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}

        {activeProcess ? (
          <motion.div
            key={activeProcess.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="text-xl font-bold z-10"
          >
            {activeProcess.id}
          </motion.div>
        ) : (
          <p className="text-sm text-gray-400 z-10">No Work</p>
        )}
      </motion.div>

      <SimulationButton
        onHandleRunSimulation={onHandleRunSimulation}
        isRunning={isRunning}
        processes={processes}
      />
    </div>
  );
};

export default CPUSimulator;
