import { CkGraphics, useCkGraphics, useCkSurface } from '@chartext/canvaskit';
import { Canvas, Surface } from 'canvaskit-wasm';
import { useLayoutEffect } from 'react';
import { useChartContext } from '@chartext/chart/context/ChartProvider';
import { LineSeries } from '@chartext/chart/series/LineSeries';
import { ScatterSeries } from '@chartext/chart/series/ScatterSeries';
import {
  SeriesDrawProps,
  SeriesDrawer,
  SeriesDrawerProps,
  SeriesType,
} from '@chartext/chart/series/Series.types';

function buildSeriesDrawer(
  props: SeriesDrawerProps,
  seriesType: SeriesType,
): SeriesDrawer {
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

export function SeriesSurface() {
  const ckGraphics: CkGraphics = useCkGraphics();
  const surface: Surface | null = useCkSurface();
  const {
    paintRepository,
    series,
    seriesSurfaceLayout,
    theme: { seriesColors },
    xyCoordLayout,
  } = useChartContext();

  useLayoutEffect(() => {
    const {
      CK: { TRANSPARENT },
    } = ckGraphics;
    const seriesColorsLength = seriesColors.length;

    const seriesDrawers = series.map((series, index) => {
      const seriesColor = seriesColors[index % seriesColorsLength];
      const paintSet = paintRepository.getPaintSet(seriesColor ?? '');
      const seriesDrawerProps: SeriesDrawerProps = {
        series,
        paintSet,
      };

      return buildSeriesDrawer(seriesDrawerProps, series.seriesType);
    });

    surface?.requestAnimationFrame((canvas: Canvas) => {
      const seriesDrawProps: SeriesDrawProps = {
        surface,
        ckGraphics,
        seriesSurfaceLayout,
        xyCoordLayout,
      };

      try {
        canvas.clear(TRANSPARENT);
        seriesDrawers.forEach((seriesDrawer) =>
          seriesDrawer.draw(seriesDrawProps),
        );
      } catch (e) {
        //
      }
    });
  }, [
    surface,
    ckGraphics,
    seriesSurfaceLayout,
    seriesColors,
    paintRepository,
    xyCoordLayout,
    series,
  ]);

  return null;
}
