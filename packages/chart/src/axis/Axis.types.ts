import { AxisTheme } from '@/theme/ChartTheme.types';

export type TickInterval = 1 | 2 | 3 | 5 | 10;

export type AxisType = 'x' | 'y';

export type AxisPosition = 'top' | 'right' | 'bottom' | 'left';

export type AxisProps = {
  fontSize?: number | undefined;
  position: AxisPosition;
  showZero?: boolean | undefined;
  size: number;
  theme?: AxisTheme;
};
