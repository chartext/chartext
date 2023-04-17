import { CkGraphics, useCkGraphicsContext, useCkSurfaceContext } from '@chartext/canvaskit';
import { Canvas, Surface } from 'canvaskit-wasm';
import { useCallback, useEffect, useMemo } from 'react';
import Axis from '@/axis/Axis';
import { useChartContext } from '@/Chart.context';
import { useChartThemeContext } from '@/theme/ChartTheme.context';
import { useDisplayContext } from '@/display/Display.context';

export default function AxisSurface() {
  const ckGraphics: CkGraphics = useCkGraphicsContext();
  const surface: Surface = useCkSurfaceContext();
  const { xDisplay, yDisplay, plotRect } = useDisplayContext();
  const {
    axis: { left: leftAxisProps, bottom: bottomAxisProps },
  } = useChartContext();

  const { paints } = useChartThemeContext();

  const leftAxis: Axis | null = useMemo(
    (): Axis | null => (leftAxisProps ? new Axis(leftAxisProps, yDisplay, ckGraphics) : null),
    [ckGraphics, leftAxisProps, yDisplay],
  );
  const bottomAxis: Axis | null = useMemo(
    (): Axis | null => (bottomAxisProps ? new Axis(bottomAxisProps, xDisplay, ckGraphics) : null),
    [bottomAxisProps, ckGraphics, xDisplay],
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

      if (leftAxis) {
        leftAxis.draw(canvas, plotRect, paints);
      }

      if (bottomAxis) {
        bottomAxis.draw(canvas, plotRect, paints);
      }
    },
    [ckGraphics.CK.TRANSPARENT, leftAxis, bottomAxis, plotRect, paints],
  );

  useEffect(() => {
    surface.drawOnce(drawOnceCallback);
  }, [drawOnceCallback, surface]);

  return null;
}
