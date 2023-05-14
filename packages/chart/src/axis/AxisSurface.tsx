import { CkGraphics, useCkGraphics, useCkSurface } from '@chartext/canvaskit';
import { Canvas, Surface } from 'canvaskit-wasm';
import { useLayoutEffect } from 'react';
import { XAxis } from '@/axis/XAxis';
import { YAxis } from '@/axis/YAxis';
import { useChartContext } from '@/context/ChartProvider';
import { CoordType } from '@/coord/Coord.types';

export function AxisSurface() {
  const ckGraphics: CkGraphics = useCkGraphics();
  const surface: Surface | null = useCkSurface();
  const {
    paintRepository,
    seriesSurfaceLayout,
    style: { margin: chartMargin },
    xyAxisConfig: [xAxisConfig, yAxisConfig],
    xyAxisTickLayout: [xAxisTickLayout, yAxisTickLayout],
    xyCoordLayout: [xLayout, yLayout],
  } = useChartContext();

  useLayoutEffect(() => {
    const xAxis: XAxis<CoordType> = new XAxis<CoordType>(
      xAxisConfig,
      xAxisTickLayout,
      chartMargin,
      ckGraphics,
      xLayout,
      paintRepository,
    );

    const yAxis: YAxis<CoordType> = new YAxis<CoordType>(
      yAxisConfig,
      yAxisTickLayout,
      chartMargin,
      ckGraphics,
      yLayout,
      paintRepository,
    );

    surface?.requestAnimationFrame((canvas: Canvas) => {
      try {
        canvas.clear(ckGraphics.TRANSPARENT);
        if (!xAxis.isDeleted) {
          xAxis.draw(canvas, seriesSurfaceLayout);
        }

        if (!yAxis.isDeleted) {
          yAxis.draw(canvas, seriesSurfaceLayout);
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
    chartMargin,
    ckGraphics,
    paintRepository,
    seriesSurfaceLayout,
    surface,
    xAxisConfig,
    xAxisTickLayout,
    xLayout,
    yAxisConfig,
    yAxisTickLayout,
    yLayout,
  ]);

  return null;
}
