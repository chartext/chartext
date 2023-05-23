import { Margin } from '@chartext/chart/layout/ChartLayout.types';

export type LabelStyle = {
  fontSize: number;
  fontColor: string;
};

export type AxisTickStyle = {
  color: string;
  zeroColor: string;
  labelStyle: LabelStyle;
};

export type AxisStyle = {
  labelStyle: LabelStyle;
  tickStyle: AxisTickStyle;
};

export type ChartStyle = {
  backgroundColor: string;
  margin: Margin;
  seriesColors: string[];
};

export type ChartTheme = ChartStyle & {
  xAxisStyle: AxisStyle;
  yAxisStyle: AxisStyle;
};
