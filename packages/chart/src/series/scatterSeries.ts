import { Canvas, Paint } from 'canvaskit-wasm';
import { SeriesDisplay, SeriesDisplayProps } from '@/series/seriesDisplay';

export class ScatterSeries implements SeriesDisplay {
  readonly #viewCoords: [number, number][];

  readonly #paint: Paint;

  #isDeleted = false;

  constructor(props: SeriesDisplayProps) {
    const {
      series: { data },
      paintSet: { fill },
      xDisplay,
      yDisplay,
    } = props;

    this.#paint = fill;

    this.#viewCoords = data.map((xy) => {
      const { x: xValue, y: yValue } = xy;

      const x = xDisplay.getViewCoord(xValue);
      const y = yDisplay.getViewCoord(yValue);

      return [x, y];
    });
  }

  draw(canvas: Canvas): void {
    this.#viewCoords.forEach(([x, y]) => {
      canvas.drawCircle(x, y, 2, this.#paint);
    });
  }

  delete(): void {
    this.#isDeleted = true;
  }

  get isDeleted() {
    return this.#isDeleted;
  }
}
