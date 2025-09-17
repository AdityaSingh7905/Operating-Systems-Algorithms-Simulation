export default async function RoundrobinScheduling(
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
  let quant = 3;

  const gantt = [];
  const completed = [];
  const queue = [];

  const remainingMap = new Map();
  processes.forEach((p) =>
    remainingMap.set(p.id, { ...p, remaining: p.burst })
  );

  while (completed.length < processes.length) {
    // Add newly arrived processes to the queue and readyQueue
    for (const process of processes) {
      if (process.arrival === currentTime) {
        const existsInQueue = queue.find((p) => p.id === process.id);
        if (!existsInQueue) {
          queue.push({ ...process });
          setReadyQueue((prev) => [...prev, process]); // Update Ready Queue
        }
      }
    }

    if (queue.length === 0) {
      currentTime++;
      // setCurrTime(currentTime);
      await new Promise((resolve) => setTimeout(resolve, 500));
      continue;
    }

    const currentProcess = queue.shift();
    const processData = remainingMap.get(currentProcess.id);

    // Remove from readyQueue when sent to CPU
    setReadyQueue((prev) => prev.filter((p) => p.id !== currentProcess.id));

    const start = currentTime;
    const slice = Math.min(processData.remaining, quant);
    const end = start + slice;

    setActiveProcess({ ...processData, start, end });
    gantt.push({ ...processData, start, end });

    await new Promise((resolve) => setTimeout(resolve, slice * 1000));

    processData.remaining -= slice;
    currentTime += slice;
    // setCurrTime(currentTime);

    // Check for any processes arriving during the slice
    for (let time = start + 1; time <= currentTime; time++) {
      for (const process of processes) {
        if (process.arrival === time) {
          const existsInQueue = queue.find((p) => p.id === process.id);
          if (!existsInQueue && process.id !== currentProcess.id) {
            queue.push({ ...process });
            setReadyQueue((prev) => [...prev, process]); // 👈 Add to ready queue
          }
        }
      }
    }

    if (processData.remaining > 0) {
      // Re-add to the queue and Ready Queue (preempted)
      queue.push({ ...processData });
      setReadyQueue((prev) => [...prev, processData]);
    } else {
      const completedProcess = {
        ...currentProcess,
        completion: currentTime,
        turnaround: currentTime - currentProcess.arrival,
        waiting: currentTime - currentProcess.arrival - currentProcess.burst,
      };

      completed.push(completedProcess);

      setCompletedProcesses((prev) => [...prev, completedProcess]);
      setFinalTable((prev) => [...prev, completedProcess]);
    }

    setActiveProcess(null);
  }

  setGanttData(gantt);
  setProcesses([]); // Clear queue
}
