import { ChartProps, ChartStyle } from '@/Chart.types';
import { AxisConfig, XAxisConfig, YAxisConfig } from '@/axis/Axis.types';

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

const defaultChartStyle: ChartStyle = {
  backgroundColor: 'rgb(30, 30, 30)',
  margin: {
    top: 25,
    right: 25,
    bottom: 25,
    left: 25,
  },
  seriesColors: defaultSeriesColors,
};

const defaultAxisConfig: AxisConfig = {
  showZero: true,
  size: 75,
  labelFontSize: 13,
  labelColor: 'rgb(198, 198, 198)',
  tickLabelColor: 'rgb(198, 198, 198)',
  tickFontSize: 12,
  tickColor: 'rgb(64, 64, 64)',
  tickZeroColor: 'rgb(112, 112, 112)',
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
  style: defaultChartStyle,
  xAxis: defaultXAxisConfig,
  yAxis: defaultYAxisConfig,
};
