import { ChartProps, Margin } from '@/Chart.types';
import { AxisProps } from '@/axis/Axis.types';
import { SeriesTheme } from '@/theme/ChartTheme.types';

const defaultSeriesTheme: SeriesTheme = {
  colors: [
    '#8a3ffc',
    '#33b1ff',
    '#007d79',
    '#ff7eb6',
    '#fa4d56',
    '#fff1f1',
    '#6fdc8c',
    '#4589ff',
    '#d12771',
    '#d2a106',
    '#08bdba',
    '#bae6ff',
    '#ba4e00',
    '#d4bbff',
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
    position: 'left',
  },
  bottom: {
    ...defaultAxisProps,
    position: 'bottom',
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
