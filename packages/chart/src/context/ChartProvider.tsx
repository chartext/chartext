import { CkPaintRepository, useCkGraphics } from '@chartext/canvaskit';
import { PropsWithChildren, createContext, useContext, useMemo } from 'react';
import { ChartProps } from '@/Chart.types';
import {
  AxisProps,
  XAxisProps,
  XYAxisProps,
  YAxisProps,
} from '@/axis/Axis.types';
import {
  CoordConfig,
  CoordFormatter,
  CoordParser,
  CoordType,
  CoordTypeName,
} from '@/coord/Coord.types';
import { CoordLayout, XYCoordLayout } from '@/coord/CoordLayout';
import { NumberCoordLayout } from '@/coord/NumberCoordLayout';
import { Direction, RectLayout, Size } from '@/layout/ChartLayout.types';
import { parseCoord } from '@/utils/dataParsers';
import { Series } from '@/series/Series.types';

export type ChartContextProps = {
  paintRepository: CkPaintRepository;
  series: Series[];
  seriesColors: string[];
  seriesSurfaceRect: RectLayout;
  size: Size;
  xyAxisProps: XYAxisProps;
  xyCoordLayout: XYCoordLayout<CoordType, CoordType>;
};

export type ChartProviderProps = Omit<ChartProps, 'xAxis' | 'yAxis'> & {
  xAxisProps: XAxisProps;
  yAxisProps: YAxisProps;
};

const ChartContext = createContext<ChartContextProps>({} as ChartContextProps);
export const useChartContext = () => useContext(ChartContext);

function buildCoordLayout(
  values: CoordType[],
  direction: Direction,
  parser?: CoordParser<CoordType>,
  formatter?: CoordFormatter<CoordType>,
): CoordLayout<CoordType> | null {
  const firstValue: CoordType | undefined = values.find(Boolean);
  const maxTicks = 10;

  if (firstValue) {
    const parsedValue: CoordType = parser
      ? parser.parse(firstValue)
      : firstValue;

    if (parsedValue) {
      const parsedType: CoordTypeName | null = parseCoord(parsedValue);

      if (parsedType) {
        switch (parsedType) {
          case 'integer':
          case 'float':
            return new NumberCoordLayout(
              values as number[],
              maxTicks,
              direction,
              formatter,
            ) as CoordLayout<CoordType>;
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
  }

  return null;
}

function buildXYCoordLayout(
  series: Series[],
  xConfig?: CoordConfig,
  yConfig?: CoordConfig,
): XYCoordLayout<CoordType, CoordType> | null {
  const xValues: CoordType[] = [];
  const yValues: CoordType[] = [];

  series.forEach(({ data }) => {
    data.forEach(({ x, y }) => {
      /* if ('x' in item) {
        xValues.push((item as XY).x);
      } else {
        xValues.push(xProps.)
      } */

      xValues.push(x);
      yValues.push(y);
    });
  });

  const xCoordLayout = buildCoordLayout(
    xValues,
    'horizontal',
    xConfig?.parser,
    xConfig?.formatter,
  );

  if (!xCoordLayout) return null;

  const yCoordLayout = buildCoordLayout(
    yValues,
    'vertical',
    yConfig?.parser,
    yConfig?.formatter,
  );

  if (!yCoordLayout) return null;

  return {
    xCoordLayout: xCoordLayout as CoordLayout<CoordType>,
    yCoordLayout: yCoordLayout as CoordLayout<CoordType>,
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
    series,
    seriesColors,
    size,
    xAxisProps,
    yAxisProps,
    xConfig,
    yConfig,
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

    const seriesSurfaceHeight: number = height - topMargin - bottomMargin;
    const seriesSurfaceWidth: number = width - leftMargin - rightMargin;

    return {
      left: leftMargin,
      right: leftMargin + seriesSurfaceWidth,
      top: topMargin,
      bottom: topMargin + seriesSurfaceHeight,
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

  const xyCoordLayout = useMemo(
    () => buildXYCoordLayout(series, xConfig, yConfig),
    [series, xConfig, yConfig],
  );

  return xyCoordLayout ? (
    <ChartContext.Provider
      value={{
        paintRepository,
        series,
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
