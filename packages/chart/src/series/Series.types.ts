import { CkGraphics, CkPaintSet } from '@chartext/canvaskit';
import { Paint, Surface } from 'canvaskit-wasm';
import { CoordType, XY } from '@/coord/Coord.types';
import { XYCoordLayout } from '@/coord/CoordLayout';
import { RectLayout } from '@/layout/ChartLayout.types';

export type SeriesType = 'line' | 'scatter' | 'box' | 'area' | 'bar';

export type Series = {
  readonly type: SeriesType;
  readonly name: string;
  readonly data: XY[];
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
  readonly seriesSurfaceRect: RectLayout;
  readonly xyCoordLayout: XYCoordLayout<CoordType, CoordType>;
};

export interface SeriesDrawer {
  draw(props: SeriesDrawProps): void;
}
