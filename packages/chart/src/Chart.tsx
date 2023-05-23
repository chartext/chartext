import { CkSurface } from '@chartext/canvaskit';
import { Suspense, lazy, useMemo } from 'react';
import { ChartConfig } from '@chartext/chart/Chart.types';
import { defaultChartProps } from '@chartext/chart/ChartDefaults';
import { ChartEmpty } from '@chartext/chart/ChartEmpty';
import { ChartLoading } from '@chartext/chart/ChartLoading';
import { XAxisConfig, YAxisConfig } from '@chartext/chart/axis/Axis.types';
import { AxisSurface } from '@chartext/chart/axis/AxisSurface';
import { ChartProvider } from '@chartext/chart/context/ChartProvider';
import { Size } from '@chartext/chart/layout/ChartLayout.types';
import { SeriesSurface } from '@chartext/chart/series/SeriesSurface';
import { ChartTheme } from '@chartext/chart/theme/ChartTheme.types';

const CkGraphicsProviderLazy = lazy(() =>
  import('@chartext/canvaskit').then(({ CkGraphicsProvider }) => ({
    default: CkGraphicsProvider,
  })),
);

export function Chart(props: ChartConfig) {
  const theme: ChartTheme = useMemo(
    () => ({
      ...defaultChartProps.theme,
      ...props.theme,
    }),
    [props.theme],
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
          style={{ ...size, backgroundColor: theme.backgroundColor, margin: 0 }}
        >
          {props.series && props.series.length > 0 ? (
            <ChartProvider
              theme={theme}
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
