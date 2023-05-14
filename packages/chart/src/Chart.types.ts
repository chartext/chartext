import { XAxisConfig, YAxisConfig } from '@/axis/Axis.types';
import { CoordConfig } from '@/coord/Coord.types';
import { Margin, Size } from '@/layout/ChartLayout.types';
import { Series } from '@/series/Series.types';

export type ChartStyle = {
  backgroundColor: string;
  margin: Margin;
  seriesColors: string[];
};

export type ChartProps = Readonly<{
  size: Size;
  series: Series[];
  xAxis: XAxisConfig;
  yAxis: YAxisConfig;
  xConfig?: CoordConfig | undefined;
  yConfig?: CoordConfig | undefined;
  style: ChartStyle;
}>;

export type ChartConfig = Partial<
  Omit<ChartProps, 'style' | 'xAxis' | 'yAxis' | 'size' | 'xConfig' | 'yConfig'>
> &
  Readonly<{
    height?: number;
    width?: number;
    xAxis?: Partial<XAxisConfig>;
    yAxis?: Partial<YAxisConfig>;
    x?: CoordConfig;
    y?: CoordConfig;
    style?: Partial<ChartStyle>;
  }>;
