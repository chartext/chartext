import { ReactElement } from 'react';
import { AxisProps } from '@/axis/axis.types';
import { Plot } from '@/plot/plot.types';
import { SeriesTheme } from '@/theme/chartTheme.types';

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

export type PlotDim = {
  margin: Margin<number>;
  rect: Rect<number>;
  size: Size;
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

export type ChartSurfaceProps = {
  height: number;
  width: number;
  zIndex: number;
};

export interface ChartSurfaceRenderer {
  delete(): void;
  isDeleted: boolean;
}
