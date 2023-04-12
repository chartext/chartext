import { DrawSeriesProps, XY } from '@/series/Series.types';

export function drawLineSeries(props: DrawSeriesProps) {
  const { canvas, ckGraphics, data, strokePaint, plotRect, xDisplay, yDisplay } = props;

  // @ts-expect-error Typescript too dumb to parse the filter
  const sortedData: XY[] = data
    .filter((xy) => {
      return xy?.x && xy.y;
    })
    .sort((xy1, xy2) => {
      if (xy1?.x && xy2?.x) {
        const x1 = xy1.x;
        const x2 = xy2.x;

        const x1Raw = xDisplay.toRaw(x1);
        const x2Raw = xDisplay.toRaw(x2);

        return x1Raw - x2Raw;
      }

      return -1;
    });

  const startXY = sortedData.find(Boolean);

  if (startXY) {
    const { x: startXValue, y: startYValue } = startXY;

    if (!startXValue || !startYValue) return;

    const x0 = xDisplay.toViewCoord(startXValue, plotRect);
    const y0 = yDisplay.toViewCoord(startYValue, plotRect);

    ckGraphics.path((path) => {
      path.moveTo(x0, y0);

      sortedData.slice(1).forEach((xy) => {
        const { x: xValue, y: yValue } = xy;

        if (xValue && yValue) {
          const x = xDisplay.toViewCoord(xValue, plotRect);
          const y = yDisplay.toViewCoord(yValue, plotRect);
          path.lineTo(x, y);
        }
      });

      canvas.drawPath(path, strokePaint);
    });
  }
}

export function drawScatterSeries(props: DrawSeriesProps) {
  const { canvas, data, fillPaint, plotRect, xDisplay, yDisplay } = props;

  data.filter(Boolean).forEach((xy) => {
    if (xy) {
      const { x: xValue, y: yValue } = xy;
      if (xValue && yValue) {
        const x = xDisplay.toViewCoord(xValue, plotRect);
        const y = yDisplay.toViewCoord(yValue, plotRect);
        canvas.drawCircle(x, y, 2, fillPaint);
      }
    }
  });
}
