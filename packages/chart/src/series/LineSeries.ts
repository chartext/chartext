import { Canvas, Paint, Path } from 'canvaskit-wasm';
import { CkGraphics } from '@chartext/canvaskit';
import { CkSeries, CkSeriesProps } from '@/series/Series.types';

export class LineSeries implements CkSeries {
  readonly path: Path;

  readonly paint: Paint;

  constructor(props: CkSeriesProps) {
    const {
      ckGraphics,
      sortedData,
      paintSet: { stroke },
      xDisplay,
      yDisplay,
    } = props;

    this.paint = stroke;
    this.path = ckGraphics.createPath();

    const startXY = sortedData[0];

    if (startXY) {
      const { x: startXValue, y: startYValue } = startXY;
      const x0 = xDisplay.getViewCoord(startXValue);
      const y0 = yDisplay.getViewCoord(startYValue);

      this.path.moveTo(x0, y0);

      sortedData.slice(1).forEach((xy) => {
        const { x: xValue, y: yValue } = xy;

        if (xValue && yValue) {
          const x = xDisplay.getViewCoord(xValue);
          const y = yDisplay.getViewCoord(yValue);
          this.path.lineTo(x, y);
        }
      });
    }
  }

  draw(canvas: Canvas) {
    canvas.drawPath(this.path, this.paint);
  }

  delete(): void {
    CkGraphics.delete(this.path);
  }
}
