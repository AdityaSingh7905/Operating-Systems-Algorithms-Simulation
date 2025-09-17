export const parseRequests = (s) => {
  const req = s
    .trim()
    .split(/[\s,]+/)
    .filter(Boolean)
    .map((x) => Number(x))
    .filter((x) => Number.isFinite(x));
  return req;
};

export const totalSeek = (order) => {
  return order.slice(1).reduce((acc, v, i) => acc + Math.abs(v - order[i]), 0);
};
