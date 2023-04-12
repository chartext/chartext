import { CkGraphics, useCkGraphicsContext, useCkSurfaceContext } from '@chartext/canvaskit';
import { Canvas, Surface } from 'canvaskit-wasm';
import { useCallback, useEffect, useMemo } from 'react';
import Axis from '@/axis/Axis';
import { useChartContext } from '@/Chart.context';
import { useChartThemeContext } from '@/theme/ChartTheme.context';

export default function AxisSurface() {
  const ckGraphics: CkGraphics = useCkGraphicsContext();
  const surface: Surface = useCkSurfaceContext();
  const {
    axis: { left: leftAxisProps, bottom: bottomAxisProps },
    plotDisplay: { xDisplay, yDisplay },
    plotRect,
  } = useChartContext();

  const { paints } = useChartThemeContext();

  const leftAxis: Axis | null = useMemo(
    (): Axis | null =>
      leftAxisProps ? new Axis(leftAxisProps, paints, yDisplay, ckGraphics) : null,
    [ckGraphics, leftAxisProps, paints, yDisplay],
  );
  const bottomAxis: Axis | null = useMemo(
    (): Axis | null =>
      bottomAxisProps ? new Axis(bottomAxisProps, paints, xDisplay, ckGraphics) : null,
    [bottomAxisProps, ckGraphics, paints, xDisplay],
  );

  if (!leftAxis || !bottomAxis) {
    console.error('No axis defined');
  }

  useEffect(() => {
    return () => {
      if (leftAxis) leftAxis.delete();
      if (bottomAxis) bottomAxis.delete();
    };
  });

  const drawOnceCallback = useCallback(
    (canvas: Canvas) => {
      canvas.clear(ckGraphics.CK.TRANSPARENT);

      console.log('drawOnceCallback');

      if (leftAxis) {
        leftAxis.draw(canvas, plotRect);
      }

      if (bottomAxis) {
        bottomAxis.draw(canvas, plotRect);
      }
    },
    [ckGraphics.CK.TRANSPARENT, leftAxis, bottomAxis, plotRect],
  );

  useEffect(() => {
    surface.drawOnce(drawOnceCallback);
  }, [drawOnceCallback, surface]);

  return null;
}
