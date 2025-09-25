export function fcfs(head, requests) {
  // safety check
  const sequence = [Number(head), ...requests.map((r) => Number(r))];

  let totalMovement = 0;
  for (let i = 0; i < requests.length; i++) {
    totalMovement += Math.abs(sequence[i + 1] - sequence[i]);
  }
  return { sequence, totalMovement };
}
