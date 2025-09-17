import { motion } from "framer-motion";

const PagingSnapshots = ({
  snapshots,
  currentStepIndex,
  lastSnapRef,
  framesCount,
}) => {
  return (
    <div className="w-full overflow-x-auto py-6">
      <div className="flex justify-center gap-4 min-w-max px-4">
        {snapshots.slice(0, currentStepIndex).map((snap, i) => {
          const isLast = i === currentStepIndex - 1;
          return (
            <motion.div
              ref={isLast ? lastSnapRef : null}
              key={i}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-32 bg-gray-800 border border-gray-600 rounded-lg shadow shrink-0"
            >
              <div
                className={`text-center font-semibold py-2 rounded-t-lg ${
                  snap.isFault ? "bg-red-600" : "bg-green-600"
                }`}
              >
                {snap.isFault ? "Page Fault" : "Hit"}
              </div>
              <div className="flex flex-col items-center justify-center p-4 space-y-2">
                {Array.from({ length: framesCount }).map((_, idx) => (
                  <div
                    key={idx}
                    className="w-12 h-12 border border-gray-500 rounded flex items-center justify-center bg-gray-700 text-white font-bold text-lg"
                  >
                    {snap.frames[idx] ?? "-"}
                  </div>
                ))}
              </div>
              <div className="text-center text-xs py-2 border-t border-gray-600 bg-gray-700">
                ⏳ Page {snap.page}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PagingSnapshots;
