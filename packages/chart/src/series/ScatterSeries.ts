import { Canvas, Paint } from 'canvaskit-wasm';
import { CkSeries, CkSeriesProps } from '@/series/Series.types';

export default class ScatterSeries implements CkSeries {
  readonly viewCoords: [number, number][];

  readonly paint: Paint;

  constructor(props: CkSeriesProps) {
    const { sortedData, fillPaint, xDisplay, yDisplay } = props;

    this.paint = fillPaint;

    this.viewCoords = sortedData.filter(Boolean).map((xy) => {
      const { x: xValue, y: yValue } = xy;

      const x = xDisplay.getViewCoord(xValue);
      const y = yDisplay.getViewCoord(yValue);

      return [x, y];
    });
  }

  draw(canvas: Canvas): void {
    this.viewCoords.forEach(([x, y]) => {
      canvas.drawCircle(x, y, 2, this.paint);
    });
  }

  // eslint-disable-next-line class-methods-use-this
  delete(): void {
    // Nothing to delete
  }
}
