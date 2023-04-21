import { CkGraphics, CkPaintSet } from '@chartext/canvaskit';
import { Canvas } from 'canvaskit-wasm';
import { DatePart } from '@/data/Dates.types';
import { CoordDisplay } from '@/display/CoordDisplay';

export type CoordType = number | string | Date;

export type CoordTypeName = 'number' | 'string' | 'Date';

export type CoordProps = {
  formatter?: string | ((coord: CoordType) => string);
  parser?: (val: CoordType | object) => CoordType;
  spacing?: number | DatePart;
  name?: string;
};

export type XY = {
  x: CoordType;
  y: CoordType;
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

export type SeriesData = XY[];

// export type SeriesDataConfig = (Partial<XY> | undefined)[];

export type SeriesType = 'line' | 'scatter' | 'box' | 'area' | 'bar';

export type Series = {
  readonly type: SeriesType;
  readonly name: string;
  readonly data: SeriesData;
};

export type SeriesConfig = {
  readonly type: SeriesType;
  readonly name: string;
};

export type CkSeriesProps = {
  ckGraphics: CkGraphics;
  sortedData: XY[];
  index: number;
  color: string;
  paintSet: CkPaintSet;
  xDisplay: CoordDisplay<CoordType>;
  yDisplay: CoordDisplay<CoordType>;
};

export type CkSeries = {
  draw(canvas: Canvas): void;
  delete(): void;
};
