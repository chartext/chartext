import { Position } from '@/layout/ChartLayout.types';

export type XAxisPosition = Omit<Position, 'left' | 'right' | 'center'>;
export type YAxisPosition = Omit<Position, 'top' | 'bottom' | 'center'>;

export type AxisProps = {
  fontSize: number;
  size: number;
  showZero: boolean;
  tickColor: string;
  zeroTickColor: string;
};

export type XAxisProps = AxisProps & {
  position: XAxisPosition;
};

export type YAxisProps = AxisProps & {
  position: YAxisPosition;
};

export type XYAxisProps = {
  xAxisProps: XAxisProps;
  yAxisProps: YAxisProps;
};
