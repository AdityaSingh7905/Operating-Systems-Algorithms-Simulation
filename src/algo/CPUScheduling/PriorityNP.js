export default async function PriorityNPScheduling(
  processes,
  setProcesses,
  setReadyQueue,
  setActiveProcess,
  setCompletedProcesses,
  setGanttData,
  setFinalTable
) {
  let currentTime = 0;

  const gantt = [];
  const completed = [];

  const queue = [...processes];
  const st = new Set(queue.map((p) => p.id)); // track remaining process ids

  while (completed.length < processes.length) {
    const available = queue.filter(
      (p) => p.arrival <= currentTime && st.has(p.id)
    );

    if (available.length === 0) {
      currentTime++;
      await new Promise((resolve) => setTimeout(resolve, 500));
      continue;
    }

    // sort available processes with priority,
    // assuming that the lower value corresponds to higher priority
    available.sort((a, b) => a.priority - b.priority);
    const process = available[0];

    const start = Math.max(currentTime, process.arrival);
    const end = start + process.burst;

    setActiveProcess({ ...process, start, end });
    gantt.push({ ...process, start, end });

    // Simulate second-by-second execution
    for (let time = start; time <= end; time++) {
      currentTime = time;

      // Check if new processes arrived during execution
      const newReady = queue.filter(
        (p) => p.arrival === time && st.has(p.id) && p.id !== process.id
      );

      setReadyQueue((prev) => {
        // Remove current process from readyQueue (if any)
        const filtered = prev.filter((p) => p.id !== process.id);
        return [...filtered, ...newReady];
      });

      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    const completedProcess = {
      ...process,
      completion: end,
      turnaround: end - process.arrival,
      waiting: end - process.arrival - process.burst,
    };

    completed.push(completedProcess);
    st.delete(completedProcess.id);

    setCompletedProcesses((prev) => [...prev, completedProcess]);
    setFinalTable((prev) => [...prev, completedProcess]);

    currentTime = end;
    setActiveProcess(null);
  }

  setGanttData(gantt);
  setProcesses([]); // Clear the queue
}
