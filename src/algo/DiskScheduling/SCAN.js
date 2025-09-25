export function scan(head, requests, diskSize = 200) {
  let sequence = [];
  let totalMovement = 0;
  let current = head;

  let left = requests.filter((r) => r < head).sort((a, b) => a - b);
  let right = requests.filter((r) => r > head).sort((a, b) => a - b);

  sequence.push(head);

  // Move towards higher values first
  for (let req of right) {
    sequence.push(req);
    totalMovement += Math.abs(current - req);
    current = req;
  }

  // Go to end of disk
  if (current !== diskSize - 1) {
    sequence.push(diskSize - 1);
    totalMovement += Math.abs(current - (diskSize - 1));
    current = diskSize - 1;
  }

  // Then go left
  left.reverse();
  for (let req of left) {
    sequence.push(req);
    totalMovement += Math.abs(current - req);
    current = req;
  }

  return { sequence, totalMovement };
}
