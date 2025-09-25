export function MRU(refs, framesCount, setSnapshots, setPageFaults) {
  const frames = [];
  const steps = [];
  let faults = 0;
  const lastUsed = new Map();

  for (let i = 0; i < refs.length; i++) {
    const page = refs[i];
    let isFault = false;

    if (!frames.includes(page)) {
      faults++;
      isFault = true;

      if (frames.length < framesCount) {
        frames.push(page);
      } else {
        // Find most recently used
        let mruPage = frames[0];
        let maxIndex = -1;
        for (const f of frames) {
          if (lastUsed.get(f) > maxIndex) {
            maxIndex = lastUsed.get(f);
            mruPage = f;
          }
        }
        const replaceIndex = frames.indexOf(mruPage);
        frames[replaceIndex] = page;
      }
    }

    lastUsed.set(page, i);

    steps.push({ page, frames: [...frames], isFault });
  }

  setSnapshots(steps);
  setPageFaults(faults);
}
