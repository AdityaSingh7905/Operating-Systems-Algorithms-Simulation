import { useMemo } from "react";
import { parseNumberList, parseMatrix } from "../utils/DeadlockUtils";

export default function useResourceParser({
  availableTxt,
  maxTxt,
  allocTxt,
  requestTxt,
  n,
  m,
}) {
  const available = useMemo(
    () => parseNumberList(availableTxt, m) || Array(m).fill(0),
    [availableTxt, m]
  );

  const max = useMemo(
    () =>
      parseMatrix(maxTxt, n, m) ||
      Array.from({ length: n }, () => Array(m).fill(0)),
    [maxTxt, n, m]
  );

  const alloc = useMemo(
    () =>
      parseMatrix(allocTxt, n, m) ||
      Array.from({ length: n }, () => Array(m).fill(0)),
    [allocTxt, n, m]
  );

  const request = useMemo(
    () =>
      requestTxt
        ? parseMatrix(requestTxt, n, m)
        : Array.from({ length: n }, () => Array(m).fill(0)),
    [requestTxt, n, m]
  );

  const need = useMemo(
    () => max.map((row, i) => row.map((val, j) => val - alloc[i][j])),
    [max, alloc]
  );

  return { available, max, alloc, request, need };
}
