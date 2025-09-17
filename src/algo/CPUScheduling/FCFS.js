export default async function FCFSScheduling(
  processes,
  setProcesses,
  readyQueue,
  setReadyQueue,
  activeProcess,
  setActiveProcess,
  completedProcess,
  setCompletedProcesses,
  setGanttData,
  setFinalTable
) {
  let currentTime = 0;
  const gantt = [];

  const completedSet = new Set();

  const sorted = [...processes].sort((a, b) => a.arrival - b.arrival);

  for (let i = 0; i < sorted.length; i++) {
    const process = sorted[i];
    const start = currentTime < process.arrival ? process.arrival : currentTime;
    const end = start + process.burst;

    // 🛠️ Update the ready queue at this point
    const newReadyQueue = sorted.filter(
      (p) => p.arrival <= end && p.id !== process.id && !completedSet.has(p.id)
    );
    setReadyQueue(newReadyQueue);

    // Set the active process (running on CPU)
    setActiveProcess({ ...process, start, end });
    gantt.push({ ...process, start, end });

    await new Promise((resolve) => setTimeout(resolve, process.burst * 1000));

    // After execution
    const completed = {
      ...process,
      completion: end,
      turnaround: end - process.arrival,
      waiting: end - process.arrival - process.burst,
    };

    completedSet.add(completed.id);
    setCompletedProcesses((prev) => [...prev, completed]);
    setFinalTable((prev) => [...prev, completed]);

    currentTime = end;
    setActiveProcess(null);
  }

  setGanttData(gantt);
  setProcesses([]); // Clear the queue
  setReadyQueue([]); // reset the ready queue
}
