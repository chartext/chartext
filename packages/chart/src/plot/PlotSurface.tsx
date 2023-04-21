import { CkGraphics, useCkGraphicsContext, useCkSurfaceContext } from '@chartext/canvaskit';
import { Canvas, Surface } from 'canvaskit-wasm';
import { useEffect } from 'react';
import { useChartContext } from '@/Chart.context';
import { useChartThemeContext } from '@/theme/ChartTheme.context';
import { CkSeries, CkSeriesProps, SeriesType, XY } from '@/series/Series.types';
import { LineSeries } from '@/series/LineSeries';
import { ScatterSeries } from '@/series/ScatterSeries';
import { useDisplayContext } from '@/display/Display.context';

function createCkSeries(props: CkSeriesProps, seriesType: SeriesType): CkSeries {
  switch (seriesType) {
    case 'line':
      return new LineSeries(props);
    case 'scatter':
      return new ScatterSeries(props);
    case 'box':
    case 'area':
    case 'bar':
    default:
      throw new Error(`Series type not implemented: ${seriesType}`);
  }
}

export function PlotSurface() {
  const { paints } = useChartThemeContext();
  const ckGraphics: CkGraphics = useCkGraphicsContext();
  const surface: Surface = useCkSurfaceContext();
  const { xDisplay, yDisplay } = useDisplayContext();
  const { seriesTheme, plot } = useChartContext();

  const { CK } = ckGraphics;

  useEffect(() => {
    const ckSeries: CkSeries[] | undefined = plot?.series.map((series, index) => {
      const { data } = series;

      const sortedData: XY[] = data.sort((xy1, xy2) => {
        const x1 = xy1.x;
        const x2 = xy2.x;

        const x1Number = xDisplay.toNumber(x1);
        const x2Number = xDisplay.toNumber(x2);

        const xCompare = x1Number - x2Number;

        if (xCompare === 0) {
          const y1 = xy1.y;
          const y2 = xy2.y;

          const y1Number = yDisplay.toNumber(y1);
          const y2Number = yDisplay.toNumber(y2);

          return y1Number - y2Number;
        }

        return xCompare;
      });

      const { colors: seriesThemeColors } = seriesTheme;
      const seriesColor = seriesThemeColors[index % seriesThemeColors.length];

      const paintSet = paints.get(seriesColor ?? '');

      const ckSeriesProps: CkSeriesProps = {
        ckGraphics,
        xDisplay,
        yDisplay,
        sortedData,
        index,
        color: seriesColor ?? '#000',
        paintSet,
      };

      return createCkSeries(ckSeriesProps, series.type);
    });

    surface.drawOnce((canvas: Canvas) => {
      canvas.clear(CK.TRANSPARENT);
      ckSeries?.forEach((cks) => cks.draw(canvas));
    });

    return () => {
      ckSeries?.forEach((cks) => cks.delete());
    };
  }, [CK, paints, ckGraphics, plot, seriesTheme, surface, xDisplay, yDisplay]);

  return null;
}
