const computeNeed = (max, alloc) => {
  return max.map((row, i) => row.map((v, j) => v - (alloc?.[i]?.[j] ?? 0)));
};

const Bankers = (max, alloc, available) => {
  const n = alloc.length;
  const m = available.length;
  const need = computeNeed(max, alloc);
  const work = [...available];
  const finish = Array(n).fill(false);
  const sequence = [];
  const steps = [];

  let progressed = true;
  while (sequence.length < n && progressed) {
    progressed = false;
    for (let i = 0; i < n; i++) {
      if (finish[i]) continue;
      const can = need[i].every((needj, j) => needj <= work[j]);
      if (can) {
        const workBefore = [...work];
        // pretend to run i and release its allocation back to work
        for (let j = 0; j < m; j++) work[j] += alloc[i][j];
        const workAfter = [...work];
        finish[i] = true;
        sequence.push(i);
        steps.push({ workBefore, pick: i, workAfter, finish: [...finish] });
        progressed = true;
      }
    }
  }

  const safe = sequence.length === n;
  return { safe, sequence, steps, need };
};

export default Bankers;
