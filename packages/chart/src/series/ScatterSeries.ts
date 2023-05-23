import { Paint } from 'canvaskit-wasm';
import {
  SeriesDrawProps,
  SeriesDrawer,
  SeriesDrawerProps,
} from '@chartext/chart/series/Series.types';
import { XY } from '@chartext/chart/coord/Coord.types';

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
      seriesSurfaceLayout,
      surface,
      xyCoordLayout: [xLayout, yLayout],
    } = props;

    surface.requestAnimationFrame((canvas) => {
      this.#data.forEach((xy) => {
        const { x: xValue, y: yValue } = xy;

        const x = xLayout.getSurfaceCoord(xValue, seriesSurfaceLayout);
        const y = yLayout.getSurfaceCoord(yValue, seriesSurfaceLayout);

        canvas.drawCircle(x, y, 1.5, this.#paint);
      });
    });
  }
}
