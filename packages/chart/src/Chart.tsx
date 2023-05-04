import { CkSurface } from '@chartext/canvaskit';
import { Suspense, lazy, useMemo } from 'react';
import { PartialChartProps } from '@/Chart.types';
import { defaultChartProps } from '@/ChartDefaults';
import { ChartEmpty } from '@/ChartEmpty';
import { ChartLoading } from '@/ChartLoading';
import { XAxisProps, YAxisProps } from '@/axis/Axis.types';
import { AxisSurface } from '@/axis/AxisSurface';
import { ChartProvider } from '@/context/ChartProvider';
import { Size } from '@/layout/ChartLayout.types';
import { SeriesSurface } from '@/series/SeriesSurface';

const CkGraphicsProviderLazy = lazy(() =>
  import('@chartext/canvaskit').then(({ CkGraphicsProvider }) => ({
    default: CkGraphicsProvider,
  })),
);

export function Chart(props: PartialChartProps) {
  const seriesColors: string[] = useMemo(
    () => props.seriesColors ?? defaultChartProps.seriesColors,
    [props.seriesColors],
  );

  const backgroundColor = useMemo(
    () => props.backgroundColor ?? defaultChartProps.backgroundColor,
    [props.backgroundColor],
  );

  const xAxisProps: XAxisProps = useMemo(
    () => ({
      ...defaultChartProps.xAxis,
      ...props.xAxis,
    }),
    [props.xAxis],
  );

  const yAxisProps: YAxisProps = useMemo(
    () => ({
      ...defaultChartProps.yAxis,
      ...props.yAxis,
    }),
    [props.yAxis],
  );

  const size: Size = useMemo(
    () => ({ ...defaultChartProps.size, ...props.size }),
    [props.size],
  );

  return (
    <Suspense fallback={<ChartLoading />}>
      <CkGraphicsProviderLazy>
        <div style={{ ...size, backgroundColor, margin: 0 }}>
          {props.plot ? (
            <ChartProvider
              backgroundColor={backgroundColor}
              plot={props.plot}
              seriesColors={seriesColors}
              size={size}
              xAxis={xAxisProps}
              yAxis={yAxisProps}
            >
              <CkSurface
                {...size}
                zIndex={1}
              >
                <AxisSurface />
              </CkSurface>
              <CkSurface
                {...size}
                zIndex={2}
              >
                <SeriesSurface />
              </CkSurface>
            </ChartProvider>
          ) : (
            <ChartEmpty />
          )}
        </div>
      </CkGraphicsProviderLazy>
    </Suspense>
  );
}

Chart.defaultProps = defaultChartProps;
