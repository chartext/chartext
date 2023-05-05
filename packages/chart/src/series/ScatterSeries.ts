import { Paint } from 'canvaskit-wasm';
import {
  SeriesDrawProps,
  SeriesDrawer,
  SeriesDrawerProps,
} from '@/series/Series.types';
import { XY } from '@/coord/Coord.types';

export class ScatterSeries implements SeriesDrawer {
  readonly #paint: Paint;
  readonly #data: XY[];

  constructor(props: SeriesDrawerProps) {
    const {
      series: { data },
      paintSet: { fill },
    } = props;

    this.#paint = fill;
    this.#data = data;
  }

  draw(props: SeriesDrawProps): void {
    const {
      seriesSurfaceRect,
      surface,
      xyCoordLayout: { xCoordLayout, yCoordLayout },
    } = props;

    surface.requestAnimationFrame((canvas) => {
      this.#data.forEach((xy) => {
        const { x: xValue, y: yValue } = xy;

        const x = xCoordLayout.getScreenCoord(xValue, seriesSurfaceRect);
        const y = yCoordLayout.getScreenCoord(yValue, seriesSurfaceRect);

        canvas.drawCircle(x, y, 1.5, this.#paint);
      });
    });
  }
}
