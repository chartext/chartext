import { CkGraphics, CkPaintSet } from '@chartext/canvaskit';
import { Canvas } from 'canvaskit-wasm';
import { CoordDisplay } from '@/coord/CoordDisplay';
import { Series, SeriesData } from '@/series/Series.types';
import { ChartSurfaceRenderer } from '@/Chart.types';
import { CoordType } from '@/coord/Coord.types';

export function sortedSeriesData(
  series: Series,
  xDisplay: CoordDisplay<CoordType>,
  yDisplay: CoordDisplay<CoordType>,
): SeriesData {
  return series.data.sort((xy1, xy2) => {
    const x1 = xy1.x;
    const x2 = xy2.x;

    const x1Number = xDisplay.toNumber(x1);
    const x2Number = xDisplay.toNumber(x2);

    const xCompare = x1Number - x2Number;

    if (xCompare === 0) {
      const y1 = xy1.y;
      const y2 = xy2.y;

      const y1Number = yDisplay.toNumber(y1);
      const y2Number = yDisplay.toNumber(y2);

      return y1Number - y2Number;
    }

    return xCompare;
  });
}

export type SeriesDisplayProps = {
  series: Series;
  paintSet: CkPaintSet;
  xDisplay: CoordDisplay<CoordType>;
  yDisplay: CoordDisplay<CoordType>;
  ckGraphics: CkGraphics;
};

export interface SeriesDisplay extends ChartSurfaceRenderer {
  draw(canvas: Canvas): void;
}
