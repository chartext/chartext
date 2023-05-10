import { CkPaintRepository, useCkGraphics } from '@chartext/canvaskit';
import { PropsWithChildren, createContext, useContext, useMemo } from 'react';
import { ChartProps, ChartStyle } from '@/Chart.types';
import { AxisTickLayout, XAxisConfig, YAxisConfig } from '@/axis/Axis.types';
import { CoordTypeName, XYTuple } from '@/coord/Coord.types';
import { RectLayout, Size } from '@/layout/ChartLayout.types';
import { Series } from '@/series/Series.types';
import { buildXYCoordLayout, buildXYTypeName } from '@/coord/CoordFactory';
import { buildXYAxisColors, buildXYAxisTickLayout } from '@/axis/AxisFactory';
import { CoordLayout } from '@/coord/CoordLayout';
import { defaultXAxisConfig, defaultYAxisConfig } from '@/ChartDefaults';
import { buildSeriesSurfaceLayout } from '@/series/SeriesSurfaceFactory';

export type ChartContextProps = {
  paintRepository: CkPaintRepository;
  series: Series[];
  seriesSurfaceLayout: RectLayout;
  size: Size;
  style: ChartStyle;
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
    style,
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
    () => buildSeriesSurfaceLayout(size, style, xyAxisConfig),
    [size, style, xyAxisConfig],
  );

  const paintRepository = useMemo(() => {
    const colors: Set<string> = new Set<string>();
    const { backgroundColor, seriesColors } = style;

    colors.add(backgroundColor);

    seriesColors.forEach(colors.add, colors);
    buildXYAxisColors(xyAxisConfig).forEach(colors.add, colors);

    return new CkPaintRepository(ckGraphics, [...colors]);
  }, [ckGraphics, style, xyAxisConfig]);

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
        style,
        xyAxisTickLayout,
        xyAxisConfig,
        xyCoordLayout,
      }}
    >
      {children}
    </ChartContext.Provider>
  ) : null;
}
