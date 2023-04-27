export type TickInterval = 1 | 2 | 3 | 5 | 10;

export type AxisType = 'x' | 'y';

export type AxisPosition = 'top' | 'right' | 'bottom' | 'left';

export type AxisProps = {
  size: number;
  showZero: boolean;
  theme: AxisTheme;
};

export type AxisTheme = {
  tickColor: string;
  zeroTickColor: string;
  fontSize: number;
};
