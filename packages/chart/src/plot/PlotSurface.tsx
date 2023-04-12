import { CkGraphics, useCkGraphicsContext, useCkSurfaceContext } from '@chartext/canvaskit';
import { Canvas, Surface } from 'canvaskit-wasm';
import { useChartContext } from '@/Chart.context';
import { useChartThemeContext } from '@/theme/ChartTheme.context';
import { drawLineSeries, drawScatterSeries } from '@/series/Series';
import { DrawSeriesProps } from '@/series/Series.types';

export default function PlotSurface() {
  const chartThemeContext = useChartThemeContext();
  const ckGraphics: CkGraphics = useCkGraphicsContext();
  const surface: Surface = useCkSurfaceContext();
  const {
    seriesTheme,
    plot,
    plotDisplay: { xDisplay, yDisplay },
    plotRect,
  } = useChartContext();

  const { CK } = ckGraphics;

  surface.drawOnce((canvas: Canvas) => {
    canvas.clear(CK.TRANSPARENT);

    plot?.series.forEach((series, index) => {
      const seriesColor = seriesTheme.colors[index];

      const fillPaint = chartThemeContext.getPaint(seriesColor, CK.PaintStyle.Fill);
      const strokePaint = chartThemeContext.getPaint(seriesColor, CK.PaintStyle.Stroke);

      const drawSeriesProps: DrawSeriesProps = {
        canvas,
        ckGraphics,
        plotRect,
        xDisplay,
        yDisplay,
        data: series.data,
        index,
        color: seriesColor ?? '#000',
        fillPaint,
        strokePaint,
      };

      switch (series.type) {
        case 'line':
          drawLineSeries(drawSeriesProps);
          break;
        case 'scatter':
          drawScatterSeries(drawSeriesProps);
          break;
        case 'box':
        case 'area':
        case 'bar':
        default:
          throw new Error(`Series type not implemented: ${series.type}`);
      }
    });
  });

  return null;
}
