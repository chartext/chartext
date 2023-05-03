import { XAxisProps, YAxisProps } from '@/axis/Axis.types';
import { Size } from '@/layout/ChartLayout.types';
import { Plot } from '@/series/Series.types';

export type ChartProps = {
  size: Size;
  plot: Plot | undefined;
  xAxis: XAxisProps;
  yAxis: YAxisProps;
  backgroundColor: string;
  seriesColors: string[];
};

export type PartialChartProps = Omit<
  Partial<ChartProps>,
  'xAxis' | 'yAxis' | 'size'
> & {
  size?: Partial<Size>;
  xAxis?: Partial<XAxisProps>;
  yAxis?: Partial<YAxisProps>;
};
