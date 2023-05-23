import { CkGraphics, useCkGraphics, useCkSurface } from '@chartext/canvaskit';
import { Canvas, Surface } from 'canvaskit-wasm';
import { useLayoutEffect } from 'react';
import { XAxis } from '@chartext/chart/axis/XAxis';
import { YAxis } from '@chartext/chart/axis/YAxis';
import { useChartContext } from '@chartext/chart/context/ChartProvider';
import { CoordType } from '@chartext/chart/coord/Coord.types';

export function AxisSurface() {
  const ckGraphics: CkGraphics = useCkGraphics();
  const surface: Surface | null = useCkSurface();
  const {
    paintRepository,
    seriesSurfaceLayout,
    xyAxisConfig: [xAxisConfig, yAxisConfig],
    xyAxisTickLayout: [xAxisTickLayout, yAxisTickLayout],
    xyCoordLayout: [xLayout, yLayout],
    theme: { margin: chartMargin, xAxisStyle, yAxisStyle },
  } = useChartContext();

  useLayoutEffect(() => {
    const xAxis: XAxis<CoordType> = new XAxis<CoordType>(
      xAxisConfig,
      xAxisStyle,
      xAxisTickLayout,
      chartMargin,
      ckGraphics,
      xLayout,
      paintRepository,
    );

    const yAxis: YAxis<CoordType> = new YAxis<CoordType>(
      yAxisConfig,
      yAxisStyle,
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
    xAxisStyle,
    xAxisTickLayout,
    xLayout,
    yAxisConfig,
    yAxisStyle,
    yAxisTickLayout,
    yLayout,
  ]);

  return null;
}
