import { CkSurface } from '@chartext/canvaskit';
import { Suspense, lazy, useMemo } from 'react';
import { ChartProps } from '@/Chart.types';
import { defaultAxisSurfaceProps, defaultChartProps, defaultSeriesTheme } from '@/ChartDefaults';
import { ChartEmpty } from '@/ChartEmpty';
import { Margin } from '@/ChartLayout.types';
import { ChartLoading } from '@/ChartLoading';
import { ChartProvider } from '@/ChartProvider';
import { AxisTheme } from '@/axis/Axis.types';
import { AxisSurface } from '@/axis/AxisSurface';
import { PlotDisplayProvider } from '@/plot/PlotDisplayProvider';
import { PlotSurface } from '@/plot/PlotSurface';
import { ChartThemeProvider } from '@/theme/ChartThemeProvider';

const CkGraphicsProviderLazy = lazy(() =>
  import('@chartext/canvaskit').then(({ CkGraphicsProvider }) => ({
    default: CkGraphicsProvider,
  })),
);

export function Chart(props: Partial<ChartProps>) {
  const {
    axis = defaultAxisSurfaceProps,
    backgroundColor,
    plot,
    seriesTheme = defaultSeriesTheme,
  } = props;

  const axisThemes: Margin<AxisTheme> = useMemo(
    () => ({
      left: axis.left?.theme,
      right: axis.right?.theme,
      top: axis.top?.theme,
      bottom: axis.bottom?.theme,
    }),
    [axis.bottom?.theme, axis.left?.theme, axis.right?.theme, axis.top?.theme],
  );

  const chartProps: ChartProps = useMemo(
    () => ({
      ...defaultChartProps,
      ...props,
    }),
    [props],
  );

  const {
    size: { height, width },
  } = chartProps;

  return (
    <Suspense fallback={<ChartLoading />}>
      <CkGraphicsProviderLazy>
        <ChartThemeProvider
          axisThemes={axisThemes}
          seriesTheme={seriesTheme}
        >
          <ChartProvider {...chartProps}>
            <div style={{ height, width, backgroundColor, margin: 0 }}>
              {plot ? (
                <PlotDisplayProvider plot={plot}>
                  <CkSurface
                    height={height}
                    width={width}
                    zIndex={1}
                  >
                    <AxisSurface />
                  </CkSurface>
                  <CkSurface
                    height={height}
                    width={width}
                    zIndex={2}
                  >
                    <PlotSurface plot={plot} />
                  </CkSurface>
                </PlotDisplayProvider>
              ) : (
                <ChartEmpty />
              )}
            </div>
          </ChartProvider>
        </ChartThemeProvider>
      </CkGraphicsProviderLazy>
    </Suspense>
  );
}

Chart.defaultProps = defaultChartProps;
