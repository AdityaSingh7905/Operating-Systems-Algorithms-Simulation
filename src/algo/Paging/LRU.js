export function LRU(refs, framesCount, setSnapshots, setPageFaults) {
  const frames = [];
  const steps = [];
  let faults = 0;
  const lastUsed = new Map(); // page → last index

  for (let i = 0; i < refs.length; i++) {
    const page = refs[i];
    let isFault = false;

    if (!frames.includes(page)) {
      faults++;
      isFault = true;

      if (frames.length < framesCount) {
        frames.push(page);
      } else {
        // Find least recently used
        let lruPage = frames[0];
        let minIndex = Infinity;
        for (const f of frames) {
          if (lastUsed.get(f) < minIndex) {
            minIndex = lastUsed.get(f);
            lruPage = f;
          }
        }
        const replaceIndex = frames.indexOf(lruPage);
        frames[replaceIndex] = page;
      }
    }

    lastUsed.set(page, i);

    steps.push({ page, frames: [...frames], isFault });
  }

  setSnapshots(steps);
  setPageFaults(faults);
}
