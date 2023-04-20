import { CkSurface } from '@chartext/canvaskit';
import { lazy, Suspense, useMemo } from 'react';
import { AxisSurface } from '@/axis/AxisSurface';
import { ChartContext } from '@/Chart.context';
import { ChartProps, Rect } from '@/Chart.types';
import { defaultAxisSurfaceProps, defaultChartProps } from '@/ChartDefaults';
import { ChartLoading } from '@/ChartLoading';
import { PlotSurface } from '@/plot/PlotSurface';
import { ChartThemeProvider } from '@/theme/ChartTheme.context';
import { DisplayProvider } from '@/display/Display.context';

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
        <ChartContext.Provider value={chartProps}>
          <ChartThemeProvider>
            <div style={{ height, width, backgroundColor, margin: 0 }}>
              {plot ? (
                <DisplayProvider
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
                </DisplayProvider>
              ) : (
                <p>No data to display.</p>
              )}
            </div>
          </ChartThemeProvider>
        </ChartContext.Provider>
      </CkGraphicsProviderLazy>
    </Suspense>
  );
}

Chart.defaultProps = defaultChartProps;
