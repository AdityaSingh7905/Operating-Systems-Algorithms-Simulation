export function MFU(refs, framesCount, setSnapshots, setPageFaults) {
  const frames = [];
  const steps = [];
  let faults = 0;
  const freq = new Map();

  for (let i = 0; i < refs.length; i++) {
    const page = refs[i];
    let isFault = false;

    if (!frames.includes(page)) {
      faults++;
      isFault = true;

      if (frames.length < framesCount) {
        frames.push(page);
      } else {
        // Find most frequently used
        let mfuPage = frames[0];
        let maxFreq = -1;
        for (const f of frames) {
          if (freq.get(f) > maxFreq) {
            maxFreq = freq.get(f);
            mfuPage = f;
          }
        }
        const replaceIndex = frames.indexOf(mfuPage);
        frames[replaceIndex] = page;
      }
    }

    freq.set(page, (freq.get(page) || 0) + 1);

    steps.push({ page, frames: [...frames], isFault });
  }

  setSnapshots(steps);
  setPageFaults(faults);
}
