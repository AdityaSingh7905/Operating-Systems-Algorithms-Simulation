const DetectDeadlock = (alloc, request, available) => {
  const n = alloc.length;
  const m = available.length;
  const work = [...available];
  const finish = Array(n).fill(false);
  const steps = [];

  // If a process holds nothing and requests nothing -> can finish immediately
  for (let i = 0; i < n; i++) {
    const holdsNone = alloc[i].every((x) => x === 0);
    const wantsNone = request[i]?.every((x) => x === 0) ?? true;
    if (holdsNone && wantsNone) finish[i] = true;
  }

  let progressed = true;
  while (progressed) {
    progressed = false;
    for (let i = 0; i < n; i++) {
      if (finish[i]) continue;
      const can = request[i].every((reqj, j) => reqj <= work[j]);
      if (can) {
        const workBefore = [...work];
        for (let j = 0; j < m; j++) work[j] += alloc[i][j];
        const workAfter = [...work];
        finish[i] = true;
        steps.push({ workBefore, run: i, workAfter, finish: [...finish] });
        progressed = true;
      }
    }
  }

  const stuck = finish.map((f, i) => (!f ? i : null)).filter((x) => x !== null);
  const deadlocked = stuck.length > 0;
  return { deadlocked, stuck, steps };
};

export default DetectDeadlock;
