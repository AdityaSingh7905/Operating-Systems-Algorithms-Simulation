export function clook(head, requests) {
  let sequence = [];
  let totalMovement = 0;
  let current = head;

  let left = requests.filter((r) => r < head).sort((a, b) => a - b);
  let right = requests.filter((r) => r > head).sort((a, b) => a - b);

  sequence.push(head);

  // Serve right first
  for (let req of right) {
    sequence.push(req);
    totalMovement += Math.abs(current - req);
    current = req;
  }

  // Jump to the lowest request
  if (left.length > 0) {
    totalMovement += Math.abs(current - left[0]);
    current = left[0];
  }

  // Serve left side
  for (let req of left) {
    sequence.push(req);
    totalMovement += Math.abs(current - req);
    current = req;
  }

  return { sequence, totalMovement };
}
