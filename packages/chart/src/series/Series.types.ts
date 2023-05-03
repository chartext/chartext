import { CkGraphics, CkPaintSet } from '@chartext/canvaskit';
import { Paint, Surface } from 'canvaskit-wasm';
import { CoordProps, CoordType, XY } from '@/coord/Coord.types';
import { XYCoordLayout } from '@/coord/CoordLayout';
import { RectLayout } from '@/layout/ChartLayout.types';

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
  readonly colors: string[];
};

export type SeriesPaint = {
  readonly fillPaint: Paint;
  readonly strokePaint: Paint;
};

export type SeriesDrawerProps = {
  readonly paintSet: CkPaintSet;
  readonly series: Series;
};

export type SeriesDrawProps = {
  readonly surface: Surface;
  readonly ckGraphics: CkGraphics;
  readonly seriesSurfaceRect: RectLayout;
  readonly xyCoordLayout: XYCoordLayout;
};

export interface SeriesDrawer {
  draw(props: SeriesDrawProps): void;
}

export type Plot = {
  readonly xProps?: CoordProps;
  readonly yProps?: CoordProps;
  readonly series: Series[];
};
