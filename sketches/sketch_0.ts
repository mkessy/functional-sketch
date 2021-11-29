import { error } from "fp-ts/lib/Console";
import { pipe } from "fp-ts/lib/function";
import * as T from "fp-ts/Tuple";
import * as RA from "fp-ts/ReadonlyArray";
import * as R from "fp-ts/Reader";
import * as C from "graphics-ts/lib/Canvas";
import * as Color from "graphics-ts/lib/Color";
import * as RI from "fp-ts-contrib/ReaderIO";
import * as D from "graphics-ts/lib/Drawing";
import * as S from "graphics-ts/lib/Shape";
import * as M from "fp-ts/Monoid";
import { ReadonlyArrayType, ReadonlyType } from "io-ts";
import { cons } from "fp-ts-contrib/lib/List";
import { genCanvasGridPoints } from "../utils/canvas";
import { getApplicativeMonoid } from "fp-ts/lib/Applicative";

const GRID_SIZE = 100;
const canvasId = "canvas";
const canvasElem = document.getElementById(canvasId) as HTMLCanvasElement;

/* const triangle: C.Render<void> = D.render(
  D.fill(
    S.path(RA.Foldable)([S.point(75, 50), S.point(100, 75), S.point(100, 25)]),
    D.fillStyle(Color.black)
  )
); */

type GenerateSketchDeps = {
  width: number;
  height: number;
};

type generate = R.Reader<GenerateSketchDeps, D.Drawing>;
/* 
const circles = (deps: GenerateSketchDeps) => {
  const circleStyle = pipe(
    [D.lineWidth(5), D.outlineColor(Color.black)],
    M.concatAll(D.monoidOutlineStyle)
  );

  return pipe(
    genCanvasGridPoints(GRID_SIZE, deps.width, deps.height),
    RA.map((gridPoint) =>
      S.arc(
        gridPoint[0],
        gridPoint[1],
        GRID_SIZE / 4,
        S.degrees(0),
        S.degrees(90)
      )
    ),
    RA.map((circle) => D.outline(circle, circleStyle)),
    M.concatAll(D.monoidDrawing)
  );
}; */

/* const squares = (deps: GenerateSketchDeps) =>
  pipe(
    genCanvasGridPoints(GRID_SIZE, deps.width, deps.height),
    RA.map((gridPoint) =>
      S.rect(gridPoint[0], gridPoint[1], GRID_SIZE / 2, GRID_SIZE / 2)
    ),
    RA.map((squares) => D.outline(squares, D.outlineColor(Color.black))),
    M.concatAll(D.monoidDrawing)
  ); */
/* 
const genSquares = pipe(R.asks<GenerateSketchDeps, D.Drawing>(squares));
const genCircles = pipe(R.asks<GenerateSketchDeps, D.Drawing>(circles));

const sketch = pipe(
  [genCircles],
  M.concatAll(getApplicativeMonoid(R.Applicative)(D.monoidDrawing))
);

const sketchRound = C.withContext(
  pipe(
    C.setLineCap("round"),
    RI.chain(() => D.render(sketch({ height: 900, width: 900 })))
  )
);

const renderSketch = D.render(
  D.translate(GRID_SIZE / 2, GRID_SIZE / 2, sketch({ width: 900, height: 900 }))
);

console.log(genCanvasGridPoints(GRID_SIZE, 900, 900));

 */
