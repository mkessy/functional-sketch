import { pipe } from "fp-ts/lib/function";
import { genCanvasGridPoints } from "../utils/canvas";
import { GenerateGridSketchDeps } from "../utils/types";
import * as D from "graphics-ts/lib/Drawing";
import * as S from "graphics-ts/lib/Shape";
import * as C from "graphics-ts/lib/Canvas";
import * as Color from "graphics-ts/lib/Color";

import * as R from "fp-ts/Reader";
import * as RI from "fp-ts-contrib/ReaderIO";
import * as M from "fp-ts/Monoid";
import * as RA from "fp-ts/ReadonlyArray";
import { getApplicativeMonoid } from "fp-ts/lib/Applicative";
import { deepStrictEqual } from "assert";

type generate = R.Reader<GenerateGridSketchDeps, D.Drawing>;

const randomArcSequence = (n: number) =>
  pipe(
    RA.makeBy(n, (i) => Math.floor(Math.random() * 50 + (335 / n) * i)),
    RA.chunksOf(2)
  );

console.log(randomArcSequence(4));

const gridSize = 450 as const;

const circles = (deps: GenerateGridSketchDeps) =>
  pipe(
    genCanvasGridPoints(deps.gridSize, deps.width, deps.height),
    RA.map((p) => S.circle(p.x, p.y, deps.gridSize / 4)),
    RA.map((arc) => D.outline(arc, D.lineWidth(1))),
    M.concatAll(D.monoidDrawing)
  );

const arcStyle = M.concatAll(D.monoidOutlineStyle)([
  D.outlineColor(Color.black),
  D.lineWidth(2.5 * (gridSize / 900) + 8),
]);
const arcs = (deps: GenerateGridSketchDeps) =>
  pipe(
    genCanvasGridPoints(deps.gridSize, deps.width, deps.height),
    RA.map((point) =>
      pipe(
        randomArcSequence(4),
        RA.map(([start, end]) =>
          S.arc(
            point.x,
            point.y,
            deps.gridSize / 4,
            S.degrees(start),
            S.degrees(end)
          )
        )
      )
    ),
    RA.flatten,
    RA.map((arc) => D.outline(arc, arcStyle)),
    M.concatAll(D.monoidDrawing)
  );

const genArcs = R.asks<GenerateGridSketchDeps, D.Drawing>(arcs);
const genCircles = R.asks<GenerateGridSketchDeps, D.Drawing>(circles);

const gridComposition = pipe(
  [genCircles, genArcs],
  M.concatAll(getApplicativeMonoid(R.Applicative)(D.monoidDrawing))
);
const sketch = D.translate(
  gridSize / 2,
  gridSize / 2,
  gridComposition({ gridSize: gridSize, width: 900, height: 900 })
);

const bg = D.render(D.fill(S.rect(0, 0, 900, 900), D.fillStyle(Color.black)));
const drawBg = C.withContext(
  pipe(
    C.setGlobalCompositeOperation("xor"),
    RI.chain(() => bg)
  )
);

C.renderTo("canvas", () => () => console.log("error"))(D.render(sketch))();
C.renderTo("canvas", () => () => console.log("error"))(drawBg)();
