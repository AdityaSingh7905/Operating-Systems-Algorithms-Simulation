export const parseRequests = (s) => {
  const req = s
    .trim() // removes leading and trailing spaces
    .split(/[\s,]+/) // splits the string s into substrings by spaces or commas
    .filter(Boolean) // removes any empty string
    .map((x) => Number(x)) // convert each substring into a number
    .filter((x) => Number.isFinite(x)); // removes any invalid number like isNaN etc.
  return req;
};

export const totalSeek = (order) => {
  return order.slice(1).reduce((acc, v, i) => acc + Math.abs(v - order[i]), 0);
};
