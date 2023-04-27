import { ChartProps } from '@/Chart.types';
import { Margin } from '@/ChartLayout.types';
import { AxisProps } from '@/axis/Axis.types';
import { SeriesTheme } from '@/series/Series.types';

const defaultSeriesTheme: SeriesTheme = {
  colors: [
    '#33b1ff',
    '#007d79',
    '#8a3ffc',
    '#fa4d56',
    '#6fdc8c',
    '#ba4e00',
    '#bae6ff',
    '#d12771',
    '#4589ff',
    '#d2a106',
    '#d4bbff',
    '#ff7eb6',
    '#fff1f1',
    '#08bdba',
  ],
};

const defaultAxisProps: Omit<AxisProps, 'position'> = {
  showZero: true,
  size: 50,
  theme: {
    fontSize: 12,
    tickColor: 'rgb(131, 131, 131)',
    zeroTickColor: 'rgb(197, 197, 197)',
  },
};

const defaultAxisSurfaceProps: Margin<AxisProps> = {
  left: {
    ...defaultAxisProps,
  },
  bottom: {
    ...defaultAxisProps,
  },
};

const defaultChartProps: ChartProps = {
  size: {
    height: window.innerHeight,
    width: window.innerWidth,
  },
  scale: window.devicePixelRatio,
  backgroundColor: 'rgb(30, 30, 30)',
  seriesTheme: defaultSeriesTheme,
  axis: defaultAxisSurfaceProps,
  plot: undefined,
};

export { defaultSeriesTheme, defaultAxisProps, defaultAxisSurfaceProps, defaultChartProps };
