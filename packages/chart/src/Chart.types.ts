import { XAxisConfig, YAxisConfig } from '@/axis/Axis.types';
import { CoordConfig } from '@/coord/Coord.types';
import { Margin, Size } from '@/layout/ChartLayout.types';
import { Series } from '@/series/Series.types';

export type ChartStyle = {
  backgroundColor: string;
  margin: Margin;
  seriesColors: string[];
};

export type ChartProps = {
  size: Size;
  series: Series[];
  xAxis: XAxisConfig;
  yAxis: YAxisConfig;
  xConfig?: CoordConfig | undefined;
  yConfig?: CoordConfig | undefined;
  style: ChartStyle;
};

export type PartialChartProps = Omit<
  Partial<ChartProps>,
  'style' | 'xAxis' | 'yAxis' | 'size' | 'xConfig' | 'yConfig'
> & {
  size?: Partial<Size>;
  xAxis?: Partial<XAxisConfig>;
  yAxis?: Partial<YAxisConfig>;
  x?: CoordConfig;
  y?: CoordConfig;
  style?: Partial<ChartStyle>;
};
