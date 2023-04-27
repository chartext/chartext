import { CkGraphics, useCkGraphics, useCkSurface } from '@chartext/canvaskit';
import { Canvas, Surface } from 'canvaskit-wasm';
import { useLayoutEffect } from 'react';
import { useChartContext } from '@/ChartProvider';
import { AxisDrawer } from '@/axis/AxisDrawer';
import { usePlotDisplay } from '@/plot/PlotDisplayProvider';
import { useChartTheme } from '@/theme/ChartThemeProvider';

export function AxisSurface() {
  const ckGraphics: CkGraphics = useCkGraphics();
  const surface: Surface | undefined = useCkSurface();
  const { xDisplay, yDisplay } = usePlotDisplay();
  const {
    plotRect,
    axis: { left: leftAxisProps, bottom: bottomAxisProps },
  } = useChartContext();

  const {
    paintRepository: paintRepository,
    axisThemes: { left: leftTheme, bottom: bottomTheme },
  } = useChartTheme();

  useLayoutEffect(() => {
    const leftAxis = leftTheme
      ? new AxisDrawer({
          ckGraphics,
          coordDisplay: yDisplay,
          paintRepository,
          position: 'left',
          theme: leftTheme,
        })
      : null;

    const bottomAxis = bottomTheme
      ? new AxisDrawer({
          ckGraphics,
          coordDisplay: xDisplay,
          paintRepository,
          position: 'bottom',
          theme: bottomTheme,
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
    bottomAxisProps,
    bottomTheme,
    ckGraphics,
    ckGraphics.CK.TRANSPARENT,
    leftAxisProps,
    leftTheme,
    paintRepository,
    plotRect,
    surface,
    xDisplay,
    yDisplay,
  ]);

  return null;
}
