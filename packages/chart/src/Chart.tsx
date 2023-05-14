import { CkSurface } from '@chartext/canvaskit';
import { Suspense, lazy, useMemo } from 'react';
import { ChartStyle, ChartConfig } from '@/Chart.types';
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

export function Chart(props: ChartConfig) {
  const style: ChartStyle = useMemo(
    () => ({
      ...defaultChartProps.style,
      ...props.style,
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
    () => ({
      height: props.height ?? defaultChartProps.size.height,
      width: props.width ?? defaultChartProps.size.width,
    }),
    [props.height, props.width],
  );

  const scale = window.devicePixelRatio;

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
                scale={scale}
                zIndex={1}
              >
                <AxisSurface />
              </CkSurface>
              <CkSurface
                {...size}
                scale={scale}
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
