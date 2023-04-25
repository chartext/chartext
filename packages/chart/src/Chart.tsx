import { CkSurface } from '@chartext/canvaskit';
import { lazy, Suspense, useMemo } from 'react';
import { AxisSurface } from '@/axis/AxisSurface';
import { ChartContext } from '@/Chart.context';
import { ChartProps, Margin, Rect } from '@/chart.types';
import { defaultAxisSurfaceProps, defaultChartProps, defaultSeriesTheme } from '@/chartDefaults';
import { ChartLoading } from '@/ChartLoading';
import { PlotSurface } from '@/plot/PlotSurface';
import { ChartThemeProvider } from '@/theme/ChartTheme.context';
import { ChartDisplayProvider } from '@/ChartDisplay.context';
import { AxisTheme } from '@/theme/chartTheme.types';
import { ChartEmpty } from '@/ChartEmpty';

const CkGraphicsProviderLazy = lazy(() =>
  import('@chartext/canvaskit').then(({ CkGraphicsProvider }) => ({
    default: CkGraphicsProvider,
  })),
);

export function Chart(props: Partial<ChartProps>) {
  console.log('Chart', props);

  const {
    axis = defaultAxisSurfaceProps,
    backgroundColor,
    plot,
    size = {
      height: defaultChartProps.size.height,
      width: defaultChartProps.size.width,
    },
    seriesTheme = defaultSeriesTheme,
  } = props;

  const plotRect: Rect<number> = useMemo(() => {
    const topMargin: number = axis.top?.size ?? 25;
    const rightMargin: number = axis.right?.size ?? 25;
    const bottomMargin: number = axis.bottom?.size ?? 25;
    const leftMargin: number = axis.left?.size ?? 25;

    const plotHeight: number = size.height - topMargin - bottomMargin;
    const plotWidth: number = size.width - leftMargin - rightMargin;

    return {
      left: leftMargin,
      right: leftMargin + plotWidth,
      top: topMargin,
      bottom: topMargin + plotHeight,
    };
  }, [axis, size]);

  const axisThemes: Margin<AxisTheme> = {
    left: axis.left?.theme,
    right: axis.right?.theme,
    top: axis.top?.theme,
    bottom: axis.bottom?.theme,
  };

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
          <ChartContext.Provider value={chartProps}>
            <div style={{ height, width, backgroundColor, margin: 0 }}>
              {plot ? (
                <ChartDisplayProvider
                  plot={plot}
                  plotRect={plotRect}
                >
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
                    <PlotSurface />
                  </CkSurface>
                </ChartDisplayProvider>
              ) : (
                <ChartEmpty />
              )}
            </div>
          </ChartContext.Provider>
        </ChartThemeProvider>
      </CkGraphicsProviderLazy>
    </Suspense>
  );
}

Chart.defaultProps = defaultChartProps;
