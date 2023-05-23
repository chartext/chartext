import { ChartProps } from '@chartext/chart/Chart.types';
import {
  AxisConfig,
  XAxisConfig,
  YAxisConfig,
} from '@chartext/chart/axis/Axis.types';
import {
  AxisStyle,
  AxisTickStyle,
  ChartTheme,
} from '@chartext/chart/theme/ChartTheme.types';

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

const defaultAxisTickStyle: AxisTickStyle = {
  color: 'rgb(64, 64, 64)',
  zeroColor: 'rgb(112, 112, 112)',
  labelStyle: {
    fontColor: 'rgb(198, 198, 198)',
    fontSize: 10,
  },
};

const defaultAxisStyle: AxisStyle = {
  labelStyle: {
    fontColor: 'rgb(198, 198, 198)',
    fontSize: 12,
  },
  tickStyle: defaultAxisTickStyle,
};

const defaultChartTheme: ChartTheme = {
  backgroundColor: 'rgb(30, 30, 30)',
  margin: {
    top: 25,
    right: 25,
    bottom: 25,
    left: 25,
  },
  seriesColors: defaultSeriesColors,
  xAxisStyle: defaultAxisStyle,
  yAxisStyle: defaultAxisStyle,
};

const defaultAxisConfig: AxisConfig = {
  showZero: true,
  size: 75,
};

export const defaultNumberFormatter = new Intl.NumberFormat(undefined, {
  notation: 'compact',
  maximumFractionDigits: 1,
});

export const defaultXAxisConfig: XAxisConfig = {
  ...defaultAxisConfig,
  position: 'bottom',
};

export const defaultYAxisConfig: YAxisConfig = {
  ...defaultAxisConfig,
  position: 'left',
};

export const defaultChartProps: ChartProps = {
  size: {
    height: window.innerHeight,
    width: window.innerWidth,
  },
  series: [],
  theme: defaultChartTheme,
  xAxis: defaultXAxisConfig,
  yAxis: defaultYAxisConfig,
};
