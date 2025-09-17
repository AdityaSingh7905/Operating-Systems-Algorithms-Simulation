export default async function SJFNPScheduling(
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

    // sort available processes with shortest burst time
    available.sort((a, b) => a.burst - b.burst);
    const process = available[0];

    const start = Math.max(currentTime, process.arrival);
    const end = start + process.burst;

    setActiveProcess({ ...process, start, end });
    gantt.push({ ...process, start, end });

    // Mark process as running — remove from ready queue
    st.delete(process.id);

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
    // st.delete(completedProcess.id);

    setCompletedProcesses((prev) => [...prev, completedProcess]);
    setFinalTable((prev) => [...prev, completedProcess]);

    currentTime = end;
    setActiveProcess(null);
  }

  setGanttData(gantt);
  setProcesses([]); // Clear the queue
}
