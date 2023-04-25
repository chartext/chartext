import { useChartContext } from '@/Chart.context';
import { useChartDisplay } from '@/ChartDisplayProvider';
import { Axis } from '@/axis/Axis';
import { useChartTheme } from '@/theme/ChartThemeProvider';
import { CkGraphics, useCkGraphics, useCkSurface } from '@chartext/canvaskit';
import { Canvas, Surface } from 'canvaskit-wasm';
import { useLayoutEffect } from 'react';

export function AxisSurface() {
  const ckGraphics: CkGraphics = useCkGraphics();
  const surface: Surface | undefined = useCkSurface();
  const { xDisplay, yDisplay, plotRect } = useChartDisplay();
  const {
    axis: { left: leftAxisProps, bottom: bottomAxisProps },
  } = useChartContext();

  const { paintRepository: paintRepository } = useChartTheme();

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
