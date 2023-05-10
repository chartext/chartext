import { CkGraphics } from '@chartext/canvaskit';
import { Paint } from 'canvaskit-wasm';
import { sortedSeriesData } from '@/series/Series';
import {
  SeriesDrawProps,
  SeriesDrawer,
  SeriesDrawerProps,
} from '@/series/Series.types';
import { XY } from '@/coord/Coord.types';

export class LineSeries implements SeriesDrawer {
  readonly #paint: Paint;
  readonly #data: XY[];

  constructor(props: SeriesDrawerProps) {
    const { series, paintSet } = props;

    this.#paint = paintSet.stroke;
    this.#data = sortedSeriesData(series);
  }

  draw(props: SeriesDrawProps) {
    const {
      seriesSurfaceLayout,
      surface,
      ckGraphics,
      xyCoordLayout: [xLayout, yLayout],
    } = props;

    const path = ckGraphics.createPath();
    const startXY = this.#data[0];

    if (startXY && !surface.isDeleted()) {
      surface.requestAnimationFrame((canvas) => {
        try {
          const { x: startXValue, y: startYValue } = startXY;
          const x0 = xLayout.getSurfaceCoord(startXValue, seriesSurfaceLayout);
          const y0 = yLayout.getSurfaceCoord(startYValue, seriesSurfaceLayout);

          path.moveTo(x0, y0);
          canvas.drawCircle(x0, y0, 1, this.#paint);

          this.#data.slice(1).forEach((xy) => {
            const { x: xValue, y: yValue } = xy;

            if (xValue && yValue) {
              const x = xLayout.getSurfaceCoord(xValue, seriesSurfaceLayout);
              const y = yLayout.getSurfaceCoord(yValue, seriesSurfaceLayout);
              path.lineTo(x, y);
              canvas.drawCircle(x, y, 1, this.#paint);
            }
          });

          canvas.drawPath(path, this.#paint);
        } finally {
          CkGraphics.delete(path);
        }
      });
    }
  }
}
