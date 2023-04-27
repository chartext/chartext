import { ReactElement } from 'react';
import { Margin, Size } from '@/ChartLayout.types';
import { AxisProps } from '@/axis/Axis.types';
import { Plot } from '@/plot/Plot.types';
import { SeriesTheme } from '@/series/Series.types';

export type ChartPlugin = {
  element: ReactElement;
  props?: object | undefined;
};

export type ChartProps = {
  size: Size;
  scale: number;
  plot: Plot | undefined;
  axis: Margin<Partial<AxisProps>>;
  backgroundColor: string;
  seriesTheme: SeriesTheme;
  // graphics?: string | undefined;
  // plugins?: ChartPlugin[] | undefined;
};
