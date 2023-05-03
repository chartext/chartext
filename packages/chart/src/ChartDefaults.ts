import { ChartProps } from '@/Chart.types';
import { AxisProps, XAxisProps, YAxisProps } from '@/axis/Axis.types';

const defaultSeriesColors: string[] = [
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
];

const defaultAxisProps: AxisProps = {
  showZero: true,
  size: 50,
  fontSize: 12,
  tickColor: 'rgb(131, 131, 131)',
  zeroTickColor: 'rgb(197, 197, 197)',
};

const defaultXAxisProps: XAxisProps = {
  ...defaultAxisProps,
  position: 'bottom',
};

const defaultYAxisProps: YAxisProps = {
  ...defaultAxisProps,
  position: 'left',
};

const defaultChartProps: ChartProps = {
  size: {
    height: window.innerHeight,
    width: window.innerWidth,
    scale: window.devicePixelRatio,
  },
  backgroundColor: 'rgb(30, 30, 30)',
  seriesColors: defaultSeriesColors,
  xAxis: defaultXAxisProps,
  yAxis: defaultYAxisProps,
  plot: undefined,
};

export { defaultChartProps };
