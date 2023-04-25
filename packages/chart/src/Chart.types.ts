import { ReactElement } from 'react';
import { AxisProps } from '@/axis/Axis.types';
import { Plot } from '@/plot/Plot.types';
import { SeriesTheme } from '@/theme/ChartTheme.types';

export type Rect<T> = {
  left: T;
  top: T;
  right: T;
  bottom: T;
};

export type Margin<T> = Partial<Rect<T | undefined>>;

export type Size = {
  height: number;
  width: number;
};

export type ChartPlugin = {
  element: ReactElement;
  props?: object | undefined;
};

export type ChartProps = {
  size: Size;
  scale: number;
  plot?: Plot | undefined;
  axis: Margin<Partial<AxisProps>>;
  backgroundColor: string;
  seriesTheme: SeriesTheme;
  // graphics?: string | undefined;
  // plugins?: ChartPlugin[] | undefined;
};

export interface ChartSurfaceRenderer {
  delete(): void;
  isDeleted: boolean;
}
