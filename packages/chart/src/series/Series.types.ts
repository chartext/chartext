import { CkGraphics, CkPaintSet } from '@chartext/canvaskit';
import { Paint, Surface } from 'canvaskit-wasm';
import { CoordType, XY } from '@/coord/Coord.types';
import { CoordDisplay } from '@/coord/CoordDisplay';

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

export type SeriesType = 'line' | 'scatter' | 'box' | 'area' | 'bar';

export type Series = {
  readonly type: SeriesType;
  readonly name: string;
  readonly data: SeriesData;
};

export type SeriesTheme = {
  colors: string[];
};

export type SeriesPaint = {
  fillPaint: Paint;
  strokePaint: Paint;
};

export type SeriesDrawerProps = {
  paintSet: CkPaintSet;
  series: Series;
};

export type SeriesDrawProps = {
  surface: Surface;
  ckGraphics: CkGraphics;
  xDisplay: CoordDisplay<CoordType>;
  yDisplay: CoordDisplay<CoordType>;
};

export interface SeriesDrawer {
  draw(props: SeriesDrawProps): void;
}
