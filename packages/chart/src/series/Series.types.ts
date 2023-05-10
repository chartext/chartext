import { CkGraphics, CkPaintSet } from '@chartext/canvaskit';
import { Paint, Surface } from 'canvaskit-wasm';
import { CoordType, XY, XYTuple } from '@/coord/Coord.types';
import { RectLayout } from '@/layout/ChartLayout.types';
import { CoordLayout } from '@/coord/CoordLayout';

export type SeriesType = 'line' | 'scatter' | 'box' | 'area' | 'bar';

export type Series<
  X extends CoordType = CoordType,
  Y extends CoordType = CoordType,
> = {
  readonly seriesType: SeriesType;
  readonly name: string;
  readonly data: XY<X, Y>[];
  // readonly data: (object | XY)[];
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
  readonly seriesSurfaceLayout: RectLayout;
  readonly xyCoordLayout: XYTuple<CoordLayout>;
};

export interface SeriesDrawer {
  draw(props: SeriesDrawProps): void;
}
