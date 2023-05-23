import { CoordType } from '@chartext/chart/coord/Coord.types';
import { Position } from '@chartext/chart/layout/ChartLayout.types';

export type XAxisPosition = Omit<Position, 'left' | 'right' | 'center'>;
export type YAxisPosition = Omit<Position, 'top' | 'bottom' | 'center'>;

export type AxisConfig = Readonly<{
  label?: string;
  size: number;
  showZero: boolean;
}>;

export type XAxisConfig = AxisConfig &
  Readonly<{
    position: XAxisPosition;
  }>;

export type YAxisConfig = AxisConfig &
  Readonly<{
    position: YAxisPosition;
  }>;

export type AxisTick = Readonly<{
  plotValue: number;
  display: string;
}>;

export type AxisTickLayout<C extends CoordType = CoordType> = Readonly<{
  min: C;
  max: C;
  ticks: AxisTick[];
}>;
