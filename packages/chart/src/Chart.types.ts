import { XAxisConfig, YAxisConfig } from '@chartext/chart/axis/Axis.types';
import { CoordConfig } from '@chartext/chart/coord/Coord.types';
import { Size } from '@chartext/chart/layout/ChartLayout.types';
import { Series } from '@chartext/chart/series/Series.types';
import {
  AxisStyle,
  ChartStyle,
  ChartTheme,
} from '@chartext/chart/theme/ChartTheme.types';

export type ChartProps = Readonly<{
  size: Size;
  series: Series[];
  xAxis: XAxisConfig;
  yAxis: YAxisConfig;
  xConfig?: CoordConfig | undefined;
  yConfig?: CoordConfig | undefined;
  theme: ChartTheme;
}>;

export type ChartThemeConfig = Partial<ChartStyle> &
  Readonly<{
    xAxis: Partial<AxisStyle>;
    yAxis: Partial<AxisStyle>;
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
    theme?: ChartThemeConfig;
  }>;
