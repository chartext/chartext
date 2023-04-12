import { CkGraphics } from '@chartext/canvaskit';
import { Canvas, Paint } from 'canvaskit-wasm';
import { Rect } from '@/Chart.types';
import { DatePart } from '@/data/Dates';
import { CoordDisplay } from '@/display/CoordDisplay';

export type CoordType = number | string | Date;

export type CoordProps = {
  formatter?: string | ((coord: CoordType) => string);
  parser?: (val: CoordType | object) => CoordType;
  spacing?: number | DatePart;
  name?: string;
};

export type XY = {
  x: CoordType | undefined;
  y: CoordType | undefined;
};

export type BoxData<O extends CoordType> = {
  readonly one: O;
  readonly q0: number;
  readonly q1: number;
  readonly q2: number;
  readonly q3: number;
  readonly q4: number;
  readonly outliers?: number[];
};

export type SeriesData = (XY | undefined)[];

export type SeriesType = 'line' | 'scatter' | 'box' | 'area' | 'bar';

export type Series = {
  readonly type: SeriesType;
  readonly name: string;
  readonly data: SeriesData;
};

export type DrawSeriesProps = {
  canvas: Canvas;
  ckGraphics: CkGraphics;
  data: SeriesData;
  index: number;
  color: string;
  fillPaint: Paint;
  strokePaint: Paint;
  plotRect: Rect<number>;
  xDisplay: CoordDisplay<CoordType>;
  yDisplay: CoordDisplay<CoordType>;
};
