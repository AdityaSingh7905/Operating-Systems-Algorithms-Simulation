export function OptimalPolicy(refs, framesCount, setSnapshots, setPageFaults) {
  const frames = [];
  const steps = [];
  let faults = 0;

  for (let i = 0; i < refs.length; i++) {
    const page = refs[i];
    let isFault = false;

    if (!frames.includes(page)) {
      faults++;
      isFault = true;

      if (frames.length < framesCount) {
        frames.push(page);
      } else {
        // Find future use
        let farthestIndex = -1;
        let replaceIndex = -1;
        for (let j = 0; j < frames.length; j++) {
          const futureIndex = refs.slice(i + 1).indexOf(frames[j]);
          if (futureIndex === -1) {
            replaceIndex = j; // Not used again
            break;
          }
          if (futureIndex > farthestIndex) {
            farthestIndex = futureIndex;
            replaceIndex = j;
          }
        }
        frames[replaceIndex] = page;
      }
    }

    steps.push({ page, frames: [...frames], isFault });
  }

  setSnapshots(steps);
  setPageFaults(faults);
}
