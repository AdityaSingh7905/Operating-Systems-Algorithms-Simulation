export default function cscan(head, requests, diskSize) {
  let sequence = [];
  let totalMovement = 0;
  let current = head;

  let right = requests.filter((r) => r > head).sort((a, b) => a - b);
  let left = requests.filter((r) => r < head).sort((a, b) => a - b);

  sequence.push(head);

  // Serve right side
  for (let req of right) {
    sequence.push(req);
    totalMovement += Math.abs(current - req);
    current = req;
  }

  // Jump to start of disk
  if (current !== diskSize - 1) {
    sequence.push(diskSize - 1);
    totalMovement += Math.abs(current - (diskSize - 1));
    current = 0;
    totalMovement += diskSize - 1;
  }

  sequence.push(0);

  // Serve left side
  for (let req of left) {
    sequence.push(req);
    totalMovement += Math.abs(current - req);
    current = req;
  }

  return { sequence, totalMovement };
}
