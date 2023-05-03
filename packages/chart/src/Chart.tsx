import { CkSurface } from '@chartext/canvaskit';
import { Suspense, lazy } from 'react';
import { PartialChartProps } from '@/Chart.types';
import { defaultChartProps } from '@/ChartDefaults';
import { ChartEmpty } from '@/ChartEmpty';
import { ChartLoading } from '@/ChartLoading';
import { AxisSurface } from '@/axis/AxisSurface';
import { ChartProvider } from '@/context/ChartProvider';
import { SeriesSurface } from '@/series/SeriesSurface';

const CkGraphicsProviderLazy = lazy(() =>
  import('@chartext/canvaskit').then(({ CkGraphicsProvider }) => ({
    default: CkGraphicsProvider,
  })),
);

export function Chart(props: PartialChartProps) {
  const { xAxis, yAxis, plot } = props;

  const seriesColors: string[] =
    props.seriesColors ?? defaultChartProps.seriesColors;

  const backgroundColor =
    props.backgroundColor ?? defaultChartProps.backgroundColor;

  const size = props.size ?? defaultChartProps.size;

  const { height, width, scale } = size;

  return (
    <Suspense fallback={<ChartLoading />}>
      <CkGraphicsProviderLazy>
        <div style={{ height, width, backgroundColor, margin: 0 }}>
          {plot ? (
            <ChartProvider
              backgroundColor={backgroundColor}
              plot={plot}
              seriesColors={seriesColors}
              size={size}
              xAxis={{
                ...defaultChartProps.xAxis,
                ...xAxis,
              }}
              yAxis={{
                ...defaultChartProps.yAxis,
                ...yAxis,
              }}
            >
              <CkSurface
                height={height}
                width={width}
                scale={scale}
                zIndex={1}
              >
                <AxisSurface />
              </CkSurface>
              <CkSurface
                height={height}
                width={width}
                scale={scale}
                zIndex={1}
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
