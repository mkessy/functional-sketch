import { pipe } from "fp-ts/lib/function";
import * as RA from "fp-ts/ReadonlyArray";

type Grid = ReadonlyArray<{ x: number; y: number }>;

export const genCanvasGridPoints = (
  gridSize: number,
  width: number,
  height: number
): Grid => {
  const nx = width / gridSize;
  const ny = height / gridSize;
  return pipe(
    RA.makeBy(nx, (xi) =>
      RA.makeBy(ny, (yi) => {
        return { x: xi * gridSize, y: yi * gridSize };
      })
    ),
    RA.flatten
  );
};
