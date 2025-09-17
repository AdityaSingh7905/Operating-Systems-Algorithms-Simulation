export default async function SRTFScheduling(
  processes,
  setProcesses,
  readyQueue,
  setReadyQueue,
  setActiveProcess,
  setCompletedProcesses,
  setGanttData,
  setFinalTable
) {
  let currentTime = 0;

  const gantt = [];
  const completed = [];

  const queue = processes.map((p) => ({ ...p, remaining: p.burst }));

  while (completed.length < processes.length) {
    // Filter available processes at current time
    const available = queue.filter(
      (p) => p.arrival <= currentTime && p.remaining > 0
    );

    // Update the Ready Queue
    setReadyQueue(
      available.map((p) => ({
        ...p,
      }))
    );

    if (available.length === 0) {
      currentTime++;
      await new Promise((resolve) => setTimeout(resolve, 500));
      continue;
    }

    // Sort by shortest remaining time
    available.sort(
      (a, b) => a.remaining - b.remaining || a.arrival - b.arrival
    );

    const process = available[0];

    // Remove current active process from ready queue
    setReadyQueue((prev) => prev.filter((p) => p.id !== process.id));

    setActiveProcess({ ...process, start: currentTime, end: currentTime + 1 });

    if (gantt.length === 0 || gantt[gantt.length - 1].id !== process.id) {
      gantt.push({
        ...process,
        start: currentTime,
        end: currentTime + 1,
      });
    } else {
      gantt[gantt.length - 1].end += 1;
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    process.remaining -= 1;
    currentTime += 1;

    if (process.remaining === 0) {
      const completedProcess = {
        ...process,
        completion: currentTime,
        turnaround: currentTime - process.arrival,
        waiting: currentTime - process.arrival - process.burst,
      };

      completed.push(completedProcess);

      setCompletedProcesses((prev) => [...prev, completedProcess]);
      setFinalTable((prev) => [...prev, completedProcess]);
    }

    setActiveProcess(null);
  }

  setGanttData(gantt);
  setProcesses([]);
}
