import { CkPaintRepository, useCkGraphics } from '@chartext/canvaskit';
import { PropsWithChildren, createContext, useContext, useMemo } from 'react';
import { ChartProps } from '@/Chart.types';
import { AxisProps, XYAxisProps } from '@/axis/Axis.types';
import { CoordProps, CoordType, CoordTypeName } from '@/coord/Coord.types';
import { CoordLayout, XYCoordLayout } from '@/coord/CoordLayout';
import { NumberCoordLayout } from '@/coord/NumberCoordLayout';
import { parseCoord } from '@/utils/dataParsers';
import { Direction, RectLayout, Size } from '@/layout/ChartLayout.types';
import { Plot } from '@/series/Series.types';

export type ChartContextProps = {
  paintRepository: CkPaintRepository;
  plot: Plot;
  seriesColors: string[];
  seriesSurfaceRect: RectLayout;
  size: Size;
  xyAxisProps: XYAxisProps;
  xyCoordLayout: XYCoordLayout;
};

export type ChartProviderProps = Omit<ChartProps, 'plot'> & {
  plot: Plot;
};

export const ChartContext = createContext<ChartContextProps>(
  {} as ChartContextProps,
);
export const useChartContext = () => useContext(ChartContext);

function buildCoordLayout(
  values: CoordType[],
  direction: Direction,
  coordProps?: CoordProps,
): CoordLayout<CoordType> | null {
  const parser = coordProps?.parser;

  const firstValue = values[0];
  const maxTicks = 10;

  if (firstValue) {
    const parsedVal = parser ? parser(firstValue) : firstValue;
    const parsedType: CoordTypeName | null = parseCoord(parsedVal);

    if (parsedType) {
      switch (parsedType) {
        case 'integer':
        case 'float':
          return new NumberCoordLayout(
            values as number[],
            maxTicks,
            direction,
            coordProps,
          );
        /* case 'date':
          return new DateCoordLayout(
            values as Date[],
            maxTicks,
            direction,
            coordProps,
          ); */
        default:
          // eslint-disable-next-line no-console
          console.error(`Type (${parsedType}) not supported.`);
          return null;
      }
    }
  }

  return null;
}

function buildXYCoordLayout(plot: Plot): XYCoordLayout | null {
  const { series, xProps, yProps } = plot;

  const xValues: CoordType[] = [];
  const yValues: CoordType[] = [];

  series.forEach(({ data }) => {
    data.forEach(({ x, y }) => {
      xValues.push(x);
      yValues.push(y);
    });
  });

  const xCoordLayout = buildCoordLayout(xValues, 'horizontal', xProps);

  if (!xCoordLayout) return null;

  const yCoordLayout = buildCoordLayout(yValues, 'vertical', yProps);

  if (!yCoordLayout) return null;

  return {
    xCoordLayout,
    yCoordLayout,
  };
}

function addAxisPropColors(colors: Set<string>, axisProps: AxisProps) {
  colors.add(axisProps.labelColor);
  colors.add(axisProps.tickLabelColor);
  colors.add(axisProps.tickColor);
  colors.add(axisProps.tickZeroColor);
}

export function ChartProvider(props: PropsWithChildren<ChartProviderProps>) {
  const {
    backgroundColor,
    plot,
    seriesColors,
    size,
    xAxis: xAxisProps,
    yAxis: yAxisProps,
    children,
  } = props;

  const ckGraphics = useCkGraphics();

  const xyAxisProps: XYAxisProps = useMemo(
    () => ({
      xAxisProps,
      yAxisProps,
    }),
    [xAxisProps, yAxisProps],
  );

  const seriesSurfaceRect: RectLayout = useMemo(() => {
    const { position: xAxisPosition, size: xAxisSize } = xAxisProps;
    const { position: yAxisPosition, size: yAxisSize } = yAxisProps;
    const { height, width } = size;

    const topMargin: number = xAxisPosition === 'top' ? xAxisSize : 25;
    const bottomMargin: number = xAxisPosition === 'bottom' ? xAxisSize : 25;

    const rightMargin: number = yAxisPosition === 'right' ? yAxisSize : 25;
    const leftMargin: number = yAxisPosition === 'left' ? yAxisSize : 25;

    const plotHeight: number = height - topMargin - bottomMargin;
    const plotWidth: number = width - leftMargin - rightMargin;

    return {
      left: leftMargin,
      right: leftMargin + plotWidth,
      top: topMargin,
      bottom: topMargin + plotHeight,
    };
  }, [size, xAxisProps, yAxisProps]);

  const paintRepository = useMemo(() => {
    const colors: Set<string> = new Set<string>();

    colors.add(backgroundColor);

    seriesColors.forEach(colors.add, colors);

    addAxisPropColors(colors, xAxisProps);
    addAxisPropColors(colors, yAxisProps);
    return new CkPaintRepository(ckGraphics, [...colors]);
  }, [backgroundColor, ckGraphics, seriesColors, xAxisProps, yAxisProps]);

  const xyCoordLayout = useMemo(() => buildXYCoordLayout(plot), [plot]);

  return xyCoordLayout ? (
    <ChartContext.Provider
      value={{
        paintRepository,
        plot,
        seriesColors,
        seriesSurfaceRect,
        size,
        xyAxisProps,
        xyCoordLayout,
      }}
    >
      {children}
    </ChartContext.Provider>
  ) : null;
}
