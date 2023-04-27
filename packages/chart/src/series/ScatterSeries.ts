import { Paint } from 'canvaskit-wasm';
import {
  SeriesData,
  SeriesDrawProps,
  SeriesDrawer,
  SeriesDrawerProps,
} from '@/series/Series.types';

export class ScatterSeries implements SeriesDrawer {
  readonly #paint: Paint;
  readonly #data: SeriesData;

  constructor(props: SeriesDrawerProps) {
    const {
      series: { data },
      paintSet: { fill },
    } = props;

    this.#paint = fill;
    this.#data = data;
  }

  draw(props: SeriesDrawProps): void {
    const { surface, xDisplay, yDisplay } = props;

    surface.requestAnimationFrame((canvas) => {
      this.#data.forEach((xy) => {
        const { x: xValue, y: yValue } = xy;

        const x = xDisplay.getViewCoord(xValue);
        const y = yDisplay.getViewCoord(yValue);

        canvas.drawCircle(x, y, 1.5, this.#paint);
      });
    });
  }
}
