export default function look(head, requests) {
  let sequence = [];
  let totalMovement = 0;
  let current = head;

  let left = requests.filter((r) => r < head).sort((a, b) => a - b);
  let right = requests.filter((r) => r > head).sort((a, b) => a - b);

  sequence.push(head);

  // Move right first
  for (let req of right) {
    sequence.push(req);
    totalMovement += Math.abs(current - req);
    current = req;
  }

  // Then move left
  left.reverse();
  
  for (let req of left) {
    sequence.push(req);
    totalMovement += Math.abs(current - req);
    current = req;
  }

  return { sequence, totalMovement };
}
