export function FIFO(
  referenceString,
  framesCount,
  setSnapshots,
  setPageFaults
) {
  const refs = referenceString
    .trim()
    .split(/[\s+,]/)
    .filter((x) => x !== "")
    .map(Number);

  const frames = [];
  const steps = [];
  let faults = 0;
  let index = 0;

  for (let i = 0; i < refs.length; i++) {
    const page = refs[i];
    let isFault = false;

    if (!frames.includes(page)) {
      faults++;
      isFault = true;

      if (frames.length < framesCount) {
        frames.push(page);
      } else {
        frames[index % framesCount] = page;
        index++;
      }
    }

    steps.push({
      page,
      frames: [...frames],
      isFault,
    });
  }

  setSnapshots(steps);
  setPageFaults(faults);
}
