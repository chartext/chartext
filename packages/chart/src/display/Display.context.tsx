import { PropsWithChildren, createContext, useContext, useMemo } from 'react';
import _ from 'lodash';
import { Rect } from '@/Chart.types';
import { CoordDisplay } from '@/display/CoordDisplay';
import { Plot } from '@/plot/Plot.types';
import { CoordProps, CoordType, CoordTypeName } from '@/series/Series.types';
import { AxisType } from '@/axis/Axis.types';
import NumberCoordDisplay from '@/display/NumberCoordDisplay';
import DateCoordDisplay from '@/display/DateCoordDisplay';

export type DisplayContextProps = {
  xDisplay: CoordDisplay<CoordType>;
  yDisplay: CoordDisplay<CoordType>;
  plotRect: Rect<number>;
};

export type DisplayProviderProps = {
  plot: Plot;
  plotRect: Rect<number>;
};

function parseSeriesType(val: CoordType): CoordTypeName {
  if (typeof val === 'string') {
    const date = Date.parse(val);
    if (date) {
      return 'Date';
    }
    const num = _.toNumber(val);
    if (num) {
      return 'number';
    }

    return 'string';
  }

  if (typeof val === 'number') {
    return 'number';
  }

  return 'string';
}

function createCoordDisplay(
  axisType: AxisType,
  values: CoordType[],
  plotRect: Rect<number>,
  coordProps?: CoordProps,
): CoordDisplay<CoordType> {
  const parser = coordProps?.parser;

  const firstValue = values[0];

  if (firstValue) {
    const parsedVal = parser ? parser(firstValue) : firstValue;
    const parsedType = parseSeriesType(parsedVal);

    switch (parsedType) {
      case 'number':
        return new NumberCoordDisplay({
          axisType,
          data: values as number[],
          plotRect,
        });
      /* case 'string':
        return new StringDisplay({
          data: data as string[],
          plotRect: this.rect,
          axis,
        }); */
      case 'Date':
        return new DateCoordDisplay({
          axisType,
          data: values as Date[],
          plotRect,
        });
      default:
        throw new Error(`Type (${parsedType}) not supported.`);
    }
  }

  throw new Error('Check your data');
}

export const DisplayContext = createContext<DisplayContextProps>({} as DisplayContextProps);
export const useDisplayContext = () => useContext(DisplayContext);

export function DisplayProvider(props: PropsWithChildren<DisplayProviderProps>) {
  const { children, plot, plotRect } = props;

  const displayContextProps: DisplayContextProps = useMemo(() => {
    const { series, xProps, yProps } = plot;

    const xValues: CoordType[] = [];
    const yValues: CoordType[] = [];

    series.forEach(({ data }) => {
      data.forEach(({ x, y }) => {
        xValues.push(x);
        yValues.push(y);
      });
    });

    const xDisplay = createCoordDisplay('x', xValues, plotRect, xProps);
    const yDisplay = createCoordDisplay('y', yValues, plotRect, yProps);

    return {
      xDisplay,
      yDisplay,
      plotRect,
    };
  }, [plot, plotRect]);

  return <DisplayContext.Provider value={displayContextProps}>{children}</DisplayContext.Provider>;
}
