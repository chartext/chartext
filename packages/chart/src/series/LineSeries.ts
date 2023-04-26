import { CkGraphics } from '@chartext/canvaskit';
import { Canvas, Paint, Path } from 'canvaskit-wasm';
import { SeriesData } from '@/series/Series.types';
import { SeriesDisplay, SeriesDisplayProps, sortedSeriesData } from '@/series/SeriesDisplay';

export class LineSeries implements SeriesDisplay {
  readonly #path: Path;
  readonly #paint: Paint;
  #isDeleted = false;

  constructor(props: SeriesDisplayProps) {
    const { series, paintSet, xDisplay, yDisplay, ckGraphics } = props;

    this.#paint = paintSet.stroke;
    this.#path = ckGraphics.createPath();

    const data: SeriesData = sortedSeriesData(series, xDisplay, yDisplay);
    const startXY = data[0];

    if (startXY) {
      const { x: startXValue, y: startYValue } = startXY;
      const x0 = xDisplay.getViewCoord(startXValue);
      const y0 = yDisplay.getViewCoord(startYValue);

      this.#path.moveTo(x0, y0);

      data.slice(1).forEach((xy) => {
        const { x: xValue, y: yValue } = xy;

        if (xValue && yValue) {
          const x = xDisplay.getViewCoord(xValue);
          const y = yDisplay.getViewCoord(yValue);
          this.#path.lineTo(x, y);
        }
      });
    }
  }

  draw(canvas: Canvas) {
    canvas.drawPath(this.#path, this.#paint);
  }

  delete(): void {
    this.#isDeleted = true;
    CkGraphics.delete(this.#path);
  }

  get isDeleted() {
    return this.#isDeleted;
  }
}
