export function sstf(head, requests) {
  const sequence = [head];
  let remaining = [...requests];
  let current = head;

  while (remaining.length > 0) {
    // pick closest request
    let closestIndex = 0;
    let closestDist = Math.abs(current - remaining[0]);
    for (let i = 1; i < remaining.length; i++) {
      let dist = Math.abs(current - remaining[i]);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    }
    current = remaining[closestIndex];
    sequence.push(current);
    remaining.splice(closestIndex, 1);
  }

  const totalMovement = sequence.reduce((acc, cur, i, arr) => {
    if (i === 0) return 0;
    return acc + Math.abs(cur - arr[i - 1]);
  }, 0);

  return { sequence, totalMovement };
}
