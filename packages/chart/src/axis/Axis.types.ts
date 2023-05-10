import { CoordType } from '@/coord/Coord.types';
import { Position } from '@/layout/ChartLayout.types';

export type XAxisPosition = Omit<Position, 'left' | 'right' | 'center'>;
export type YAxisPosition = Omit<Position, 'top' | 'bottom' | 'center'>;

export type AxisConfig = {
  label?: string;
  labelColor: string;
  labelFontSize: number;
  showZero: boolean;
  size: number;
  tickLabelColor: string;
  tickColor: string;
  tickFontSize: number;
  tickZeroColor: string;
};

export type XAxisConfig = AxisConfig & {
  position: XAxisPosition;
};

export type YAxisConfig = AxisConfig & {
  position: YAxisPosition;
};

export type AxisTick = {
  plotValue: number;
  display: string;
};

export type AxisTickLayout<C extends CoordType = CoordType> = {
  min: C;
  max: C;
  ticks: AxisTick[];
};
