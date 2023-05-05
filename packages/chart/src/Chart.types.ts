import { XAxisProps, YAxisProps } from '@/axis/Axis.types';
import { CoordConfig } from '@/coord/Coord.types';
import { Size } from '@/layout/ChartLayout.types';
import { Series } from '@/series/Series.types';

export type ChartProps = {
  size: Size;
  series: Series[];
  xAxis: XAxisProps;
  yAxis: YAxisProps;
  xConfig?: CoordConfig | undefined;
  yConfig?: CoordConfig | undefined;
  backgroundColor: string;
  seriesColors: string[];
};

export type PartialChartProps = Omit<
  Partial<ChartProps>,
  'xAxis' | 'yAxis' | 'size' | 'xConfig' | 'yConfig'
> & {
  size?: Partial<Size>;
  xAxis?: Partial<XAxisProps>;
  yAxis?: Partial<YAxisProps>;
  x?: CoordConfig;
  y?: CoordConfig;
};
