import { PropsWithChildren, createContext, useContext, useMemo } from 'react';
import { Rect } from '@/ChartLayout.types';
import { useChartContext } from '@/ChartProvider';
import { AxisType } from '@/axis/Axis.types';
import { CoordProps, CoordType, CoordTypeName } from '@/coord/Coord.types';
import { CoordDisplay } from '@/coord/CoordDisplay';
import { DateCoordDisplay } from '@/coord/DateCoordDisplay';
import { NumberCoordDisplay } from '@/coord/NumberCoordDisplay';
import { parseCoord } from '@/data/dataParsers';
import { Plot } from '@/plot/Plot.types';

export type PlotDisplayContextProps = {
  xDisplay: CoordDisplay<CoordType>;
  yDisplay: CoordDisplay<CoordType>;
};

export type PlotDisplayProviderProps = {
  plot: Plot;
};

const PlotDisplayContext = createContext<PlotDisplayContextProps>({} as PlotDisplayContextProps);
export const usePlotDisplay = () => useContext(PlotDisplayContext);

function createCoordDisplay(
  axisType: AxisType,
  values: CoordType[],
  plotRect: Rect<number>,
  coordProps?: CoordProps,
): CoordDisplay<CoordType> | null {
  const parser = coordProps?.parser;

  const firstValue = values[0];

  if (firstValue) {
    const parsedVal = parser ? parser(firstValue) : firstValue;
    const parsedType: CoordTypeName | null = parseCoord(parsedVal);

    if (parsedType) {
      switch (parsedType) {
        case 'integer':
        case 'float':
          return new NumberCoordDisplay({
            axisType,
            data: values as number[],
            plotRect,
            maxTicks: 10,
          });
        case 'date':
          return new DateCoordDisplay({
            axisType,
            data: values as Date[],
            plotRect,
            maxTicks: 10,
          });
        default:
          console.error(`Type (${parsedType}) not supported.`);
          return null;
      }
    }
  }

  return null;
}

export function PlotDisplayProvider(props: PropsWithChildren<PlotDisplayProviderProps>) {
  const {
    plot: { series, xProps, yProps },
    children,
  } = props;
  const { plotRect } = useChartContext();

  const plotDisplayContextProps: PlotDisplayContextProps | null = useMemo(() => {
    const xValues: CoordType[] = [];
    const yValues: CoordType[] = [];

    series.forEach(({ data }) => {
      data.forEach(({ x, y }) => {
        xValues.push(x);
        yValues.push(y);
      });
    });

    const xDisplay = createCoordDisplay('x', xValues, plotRect, xProps);

    if (!xDisplay) return null;

    const yDisplay = createCoordDisplay('y', yValues, plotRect, yProps);

    if (!yDisplay) return null;

    return {
      xDisplay,
      yDisplay,
    };
  }, [plotRect, series, xProps, yProps]);

  return plotDisplayContextProps ? (
    <PlotDisplayContext.Provider value={plotDisplayContextProps}>
      {children}
    </PlotDisplayContext.Provider>
  ) : null;
}
