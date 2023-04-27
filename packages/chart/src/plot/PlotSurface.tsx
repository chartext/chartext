import { CkGraphics, useCkGraphics, useCkSurface } from '@chartext/canvaskit';
import { Canvas, Surface } from 'canvaskit-wasm';
import { useLayoutEffect, useMemo } from 'react';
import { Plot } from '@/plot/Plot.types';
import { usePlotDisplay } from '@/plot/PlotDisplayProvider';
import { LineSeries } from '@/series/LineSeries';
import { ScatterSeries } from '@/series/ScatterSeries';
import {
  SeriesDrawProps,
  SeriesDrawer,
  SeriesDrawerProps,
  SeriesType,
} from '@/series/Series.types';
import { useChartTheme } from '@/theme/ChartThemeProvider';

function createSeriesDrawer(props: SeriesDrawerProps, seriesType: SeriesType): SeriesDrawer {
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

type PlotSurfaceProps = {
  plot: Plot;
};

export function PlotSurface(props: PlotSurfaceProps) {
  const ckGraphics: CkGraphics = useCkGraphics();
  const surface: Surface = useCkSurface();
  const { xDisplay, yDisplay } = usePlotDisplay();
  const {
    seriesTheme: { colors },
    paintRepository,
  } = useChartTheme();

  const { plot } = props;

  const {
    CK: { TRANSPARENT },
  } = ckGraphics;

  const seriesDrawers: SeriesDrawer[] = useMemo(
    () =>
      plot.series.map((series, index) => {
        const seriesColor = colors[index % colors.length];
        const paintSet = paintRepository.getPaintSet(seriesColor ?? '');
        const seriesDrawerProps: SeriesDrawerProps = {
          series,
          paintSet,
        };

        return createSeriesDrawer(seriesDrawerProps, series.type);
      }),
    [colors, paintRepository, plot],
  );

  useLayoutEffect(() => {
    surface.requestAnimationFrame((canvas: Canvas) => {
      canvas.clear(TRANSPARENT);
    });

    const seriesDrawProps: SeriesDrawProps = {
      surface,
      ckGraphics,
      xDisplay,
      yDisplay,
    };

    seriesDrawers.forEach((seriesDrawer) => seriesDrawer.draw(seriesDrawProps));
  }, [surface, TRANSPARENT, seriesDrawers, ckGraphics, xDisplay, yDisplay]);

  return null;
}
