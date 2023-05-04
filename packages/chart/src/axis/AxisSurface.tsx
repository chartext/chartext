import { CkGraphics, useCkGraphics, useCkSurface } from '@chartext/canvaskit';
import { Canvas, Surface } from 'canvaskit-wasm';
import { useLayoutEffect } from 'react';
import { Axis } from '@/axis/Axis';
import { XAxis } from '@/axis/XAxis';
import { YAxis } from '@/axis/YAxis';
import { useChartContext } from '@/context/ChartProvider';

export function AxisSurface() {
  const ckGraphics: CkGraphics = useCkGraphics();
  const surface: Surface | null = useCkSurface();
  const {
    paintRepository,
    seriesSurfaceRect,
    xyAxisProps: { xAxisProps, yAxisProps },
    xyCoordLayout: { xCoordLayout, yCoordLayout },
  } = useChartContext();

  useLayoutEffect(() => {
    const xAxis: Axis = new XAxis(
      xAxisProps,
      ckGraphics,
      xCoordLayout,
      paintRepository,
    );

    const yAxis: Axis = new YAxis(
      yAxisProps,
      ckGraphics,
      yCoordLayout,
      paintRepository,
    );

    surface?.requestAnimationFrame((canvas: Canvas) => {
      try {
        canvas.clear(ckGraphics.CK.TRANSPARENT);
        if (!xAxis.isDeleted) {
          xAxis.draw(canvas, seriesSurfaceRect);
        }

        if (!yAxis.isDeleted) {
          yAxis.draw(canvas, seriesSurfaceRect);
        }
      } catch (e) {
        // console.error(e);
      }
    });

    return () => {
      xAxis.delete();
      yAxis.delete();
    };
  }, [
    ckGraphics,
    ckGraphics.CK.TRANSPARENT,
    paintRepository,
    seriesSurfaceRect,
    surface,
    xAxisProps,
    xCoordLayout,
    yAxisProps,
    yCoordLayout,
  ]);

  return null;
}
