export const parseNumberList = (str, sizeHint) => {
  // Accept spaces, commas, semicolons. Collapse multiple separators. Filter NaNs.
  const out = str
    .trim()
    .split(/[\s,;]+/)
    .map((x) => Number(x))
    .filter((x) => Number.isFinite(x));
  if (sizeHint && out.length !== sizeHint) return null;
  return out;
};


export const parseMatrix = (str, rowsHint, colsHint) => {
  // Lines separated by newlines or ';', columns by spaces/commas
  const lines = str
    .trim()
    .split(/\n|;/)
    .map((ln) => ln.trim())
    .filter(Boolean);
  if (rowsHint && lines.length !== rowsHint) return null;
  const matrix = [];
  for (const ln of lines) {
    const row = ln
      .split(/[\s,]+/)
      .map((x) => Number(x))
      .filter((x) => Number.isFinite(x));
    if (!row.length) return null;
    matrix.push(row);
  }
  if (colsHint && matrix.some((r) => r.length !== colsHint)) return null;
  const cols = matrix[0]?.length ?? 0;
  if (matrix.some((r) => r.length !== cols)) return null; // ragged rows not allowed
  return matrix;
};
