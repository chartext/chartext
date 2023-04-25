import { useChartContext } from '@/Chart.context';
import { useChartDisplayContext } from '@/ChartDisplay.context';
import { Axis } from '@/axis/axis';
import { useChartThemeContext } from '@/theme/ChartTheme.context';
import { CkGraphics, useCkGraphicsContext, useCkSurfaceContext } from '@chartext/canvaskit';
import { Canvas, Surface } from 'canvaskit-wasm';
import { useLayoutEffect } from 'react';

export function AxisSurface() {
  const ckGraphics: CkGraphics = useCkGraphicsContext();
  const surface: Surface | undefined = useCkSurfaceContext();
  const { xDisplay, yDisplay, plotRect } = useChartDisplayContext();
  const {
    axis: { left: leftAxisProps, bottom: bottomAxisProps },
  } = useChartContext();

  const { paintRepository: paintRepository } = useChartThemeContext();

  useLayoutEffect(() => {
    const leftAxis = leftAxisProps
      ? new Axis({
          ckGraphics,
          coordDisplay: yDisplay,
          fontSize: leftAxisProps.fontSize!,
          paintRepository,
          position: 'left',
          theme: leftAxisProps.theme!,
        })
      : null;

    const bottomAxis = bottomAxisProps
      ? new Axis({
          ckGraphics,
          coordDisplay: xDisplay,
          fontSize: bottomAxisProps.fontSize!,
          paintRepository,
          position: 'bottom',
          theme: bottomAxisProps.theme!,
        })
      : null;

    surface.requestAnimationFrame((canvas: Canvas) => {
      canvas.clear(ckGraphics.CK.TRANSPARENT);
      if (!leftAxis?.isDeleted) {
        leftAxis?.draw(canvas, plotRect);
      }

      if (!bottomAxis?.isDeleted) {
        bottomAxis?.draw(canvas, plotRect);
      }
    });

    return () => {
      leftAxis?.delete();
      bottomAxis?.delete();
    };
  }, [
    surface,
    ckGraphics.CK.TRANSPARENT,
    plotRect,
    leftAxisProps,
    yDisplay,
    ckGraphics,
    bottomAxisProps,
    xDisplay,
    paintRepository,
  ]);

  return null;
}
