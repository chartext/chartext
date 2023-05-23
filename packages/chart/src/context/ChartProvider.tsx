import { CkPaintRepository, useCkGraphics } from '@chartext/canvaskit';
import { PropsWithChildren, createContext, useContext, useMemo } from 'react';
import { ChartProps } from '@chartext/chart/Chart.types';
import {
  defaultXAxisConfig,
  defaultYAxisConfig,
} from '@chartext/chart/ChartDefaults';
import {
  AxisTickLayout,
  XAxisConfig,
  YAxisConfig,
} from '@chartext/chart/axis/Axis.types';
import {
  buildXYAxisColors,
  buildXYAxisTickLayout,
} from '@chartext/chart/axis/AxisFactory';
import { CoordTypeName, XYTuple } from '@chartext/chart/coord/Coord.types';
import {
  buildXYCoordLayout,
  buildXYTypeName,
} from '@chartext/chart/coord/CoordFactory';
import { CoordLayout } from '@chartext/chart/coord/CoordLayout';
import { RectLayout, Size } from '@chartext/chart/layout/ChartLayout.types';
import { Series } from '@chartext/chart/series/Series.types';
import { buildSeriesSurfaceLayout } from '@chartext/chart/series/SeriesSurfaceFactory';
import { ChartTheme } from '@chartext/chart/theme/ChartTheme.types';

export type ChartContextProps = {
  paintRepository: CkPaintRepository;
  series: Series[];
  seriesSurfaceLayout: RectLayout;
  size: Size;
  theme: ChartTheme;
  xyAxisConfig: XYTuple<XAxisConfig, YAxisConfig>;
  xyAxisTickLayout: XYTuple<AxisTickLayout>;
  xyCoordLayout: XYTuple<CoordLayout>;
};

export type ChartProviderProps = Omit<ChartProps, 'xAxis' | 'yAxis'> & {
  xAxisConfig: XAxisConfig;
  yAxisConfig: YAxisConfig;
};

const ChartContext = createContext<ChartContextProps>({} as ChartContextProps);
export const useChartContext = () => useContext(ChartContext);

export function ChartProvider(props: PropsWithChildren<ChartProviderProps>) {
  const {
    series,
    size,
    theme,
    xAxisConfig,
    yAxisConfig,
    xConfig,
    yConfig,
    children,
  } = props;

  const ckGraphics = useCkGraphics();

  const xyAxisConfig: XYTuple<XAxisConfig, YAxisConfig> = useMemo(
    () => [
      { ...defaultXAxisConfig, ...xAxisConfig },
      { ...defaultYAxisConfig, ...yAxisConfig },
    ],
    [xAxisConfig, yAxisConfig],
  );

  const seriesSurfaceLayout: RectLayout = useMemo(
    () => buildSeriesSurfaceLayout(size, theme, xyAxisConfig),
    [size, theme, xyAxisConfig],
  );

  const paintRepository = useMemo(() => {
    const colors: Set<string> = new Set<string>();
    const { backgroundColor, seriesColors } = theme;

    colors.add(backgroundColor);

    seriesColors.forEach(colors.add, colors);
    buildXYAxisColors([theme.xAxisStyle, theme.yAxisStyle]).forEach(
      colors.add,
      colors,
    );

    return new CkPaintRepository(ckGraphics, [...colors]);
  }, [ckGraphics, theme]);

  const xyTypeName: XYTuple<CoordTypeName> | null = useMemo(
    () => buildXYTypeName(series),
    [series],
  );

  const xyAxisTickLayout: XYTuple<AxisTickLayout> | null = useMemo(
    () =>
      xyTypeName ? buildXYAxisTickLayout(series, xyTypeName, [10, 10]) : null,
    [series, xyTypeName],
  );

  const xyCoordLayout: XYTuple<CoordLayout> | null = useMemo(
    () =>
      xyTypeName && xyAxisTickLayout
        ? buildXYCoordLayout(xyAxisTickLayout, xyTypeName, [xConfig, yConfig])
        : null,
    [xConfig, xyAxisTickLayout, xyTypeName, yConfig],
  );

  return xyAxisTickLayout && xyCoordLayout ? (
    <ChartContext.Provider
      value={{
        paintRepository,
        series,
        seriesSurfaceLayout,
        size,
        theme,
        xyAxisTickLayout,
        xyAxisConfig,
        xyCoordLayout,
      }}
    >
      {children}
    </ChartContext.Provider>
  ) : null;
}
