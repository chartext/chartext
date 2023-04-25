import { AxisTheme } from '@/theme/chartTheme.types';

export type TickInterval = 1 | 2 | 3 | 5 | 10;

export type AxisType = 'x' | 'y';

export type AxisPosition = 'top' | 'right' | 'bottom' | 'left';

export type AxisProps = {
  fontSize: number;
  showZero: boolean;
  size: number;
  theme: AxisTheme;
};
