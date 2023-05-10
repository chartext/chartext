import { CkSurface } from '@chartext/canvaskit';
import { Suspense, lazy, useMemo } from 'react';
import { ChartStyle, PartialChartProps } from '@/Chart.types';
import { defaultChartProps } from '@/ChartDefaults';
import { ChartEmpty } from '@/ChartEmpty';
import { ChartLoading } from '@/ChartLoading';
import { XAxisConfig, YAxisConfig } from '@/axis/Axis.types';
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
  const style: ChartStyle = useMemo(
    () => ({
      ...props.style,
      ...defaultChartProps.style,
    }),
    [props.style],
  );

  const xAxisConfig: XAxisConfig = useMemo(
    () => ({
      ...defaultChartProps.xAxis,
      ...props.xAxis,
    }),
    [props.xAxis],
  );

  const yAxisConfig: YAxisConfig = useMemo(
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
        <div
          style={{ ...size, backgroundColor: style.backgroundColor, margin: 0 }}
        >
          {props.series && props.series.length > 0 ? (
            <ChartProvider
              style={style}
              series={props.series}
              size={size}
              xAxisConfig={xAxisConfig}
              yAxisConfig={yAxisConfig}
              xConfig={props.x}
              yConfig={props.y}
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
