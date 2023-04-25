import { ChartProps, Margin } from '@/chart.types';
import { AxisProps } from '@/axis/axis.types';
import { SeriesTheme } from '@/theme/chartTheme.types';

const defaultSeriesTheme: SeriesTheme = {
  colors: [
    '#007d79',
    '#33b1ff',
    '#fa4d56',
    '#6fdc8c',
    '#8a3ffc',
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
  fontSize: 12,
  showZero: true,
  size: 50,
  theme: {
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
};

export { defaultSeriesTheme, defaultAxisProps, defaultAxisSurfaceProps, defaultChartProps };
