import { CkSurface } from '@chartext/canvaskit';
import { lazy, Suspense, useMemo } from 'react';
import AxisSurface from '@/axis/AxisSurface';
import { ChartContext, ChartContextProps } from '@/Chart.context';
import { ChartProps, Rect } from '@/Chart.types';
import { defaultAxisSurfaceProps, defaultChartProps } from '@/ChartDefaults';
import ChartLoading from '@/ChartLoading';
import PlotDisplay from '@/display/PlotDisplay';
import PlotSurface from '@/plot/PlotSurface';
import { ChartThemeProvider } from '@/theme/ChartTheme.context';

const CkGraphicsProviderLazy = lazy(() =>
  import('@chartext/canvaskit').then(({ CkGraphicsProvider }) => ({
    default: CkGraphicsProvider,
  })),
);

export default function Chart(props: Partial<ChartProps>) {
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

  const plotDisplay = useMemo(() => new PlotDisplay(plot), [plot]);

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

  const chartProviderProps: ChartContextProps = useMemo(
    () => ({
      ...defaultChartProps,
      ...props,
      plotDisplay,
      plotRect,
    }),
    [plotDisplay, plotRect, props],
  );

  const {
    size: { height, width },
  } = chartProviderProps;

  return (
    <Suspense fallback={<ChartLoading />}>
      <CkGraphicsProviderLazy>
        <ChartContext.Provider value={chartProviderProps}>
          <ChartThemeProvider>
            <div style={{ height, width, backgroundColor }}>
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
            </div>
          </ChartThemeProvider>
        </ChartContext.Provider>
      </CkGraphicsProviderLazy>
    </Suspense>
  );
}

Chart.defaultProps = defaultChartProps;
