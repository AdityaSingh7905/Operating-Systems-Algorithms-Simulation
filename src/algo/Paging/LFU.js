export function LFU(referenceString, framesCount, setSnapshots, setPageFaults) {
  const refs = referenceString
    .trim()
    .split(/[\s+,]/)
    .filter((x) => x !== "")
    .map(Number);

  const frames = [];
  const steps = [];
  let faults = 0;
  const freq = new Map(); // page → frequency

  for (let i = 0; i < refs.length; i++) {
    const page = refs[i];
    let isFault = false;

    if (!frames.includes(page)) {
      faults++;
      isFault = true;

      if (frames.length < framesCount) {
        frames.push(page);
      } else {
        // Find least frequently used
        let lfuPage = frames[0];
        let minFreq = Infinity;
        for (const f of frames) {
          if (freq.get(f) < minFreq) {
            minFreq = freq.get(f);
            lfuPage = f;
          }
        }
        const replaceIndex = frames.indexOf(lfuPage);
        frames[replaceIndex] = page;
      }
    }

    freq.set(page, (freq.get(page) || 0) + 1);

    steps.push({ page, frames: [...frames], isFault });
  }

  setSnapshots(steps);
  setPageFaults(faults);
}
