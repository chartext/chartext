import { CkGraphics } from '@chartext/canvaskit';
import { Paint } from 'canvaskit-wasm';
import { sortedSeriesData } from '@/series/Series';
import {
  SeriesData,
  SeriesDrawProps,
  SeriesDrawer,
  SeriesDrawerProps,
} from '@/series/Series.types';

export class LineSeries implements SeriesDrawer {
  readonly #paint: Paint;
  readonly #data: SeriesData;

  constructor(props: SeriesDrawerProps) {
    const { series, paintSet } = props;

    this.#paint = paintSet.stroke;
    this.#data = sortedSeriesData(series);
  }

  draw(props: SeriesDrawProps) {
    const {
      seriesSurfaceRect,
      surface,
      ckGraphics,
      xyCoordLayout: { xCoordLayout, yCoordLayout },
    } = props;

    const startXY = this.#data[0];

    if (startXY) {
      const path = ckGraphics.createPath();

      const { x: startXValue, y: startYValue } = startXY;
      const x0 = xCoordLayout.getScreenCoord(startXValue, seriesSurfaceRect);
      const y0 = yCoordLayout.getScreenCoord(startYValue, seriesSurfaceRect);

      path.moveTo(x0, y0);

      this.#data.slice(1).forEach((xy) => {
        const { x: xValue, y: yValue } = xy;

        if (xValue && yValue) {
          const x = xCoordLayout.getScreenCoord(xValue, seriesSurfaceRect);
          const y = yCoordLayout.getScreenCoord(yValue, seriesSurfaceRect);
          path.lineTo(x, y);
        }
      });
      surface.requestAnimationFrame((canvas) => {
        canvas.drawPath(path, this.#paint);
        CkGraphics.delete(path);
      });
    }
  }
}
