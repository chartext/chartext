import { Rect } from '@/Chart.types';
import { AxisType } from '@/axis/Axis.types';
import { CoordProps, CoordType, CoordTypeName } from '@/coord/Coord.types';
import { CoordDisplay } from '@/coord/CoordDisplay';
import { DateCoordDisplay } from '@/coord/DateCoordDisplay';
import { NumberCoordDisplay } from '@/coord/NumberCoordDisplay';
import { parseCoord } from '@/data/dataParsers';
import { Plot } from '@/plot/Plot.types';
import { LineSeries } from '@/series/LineSeries';
import { ScatterSeries } from '@/series/ScatterSeries';
import { SeriesType } from '@/series/Series.types';
import { SeriesDisplay, SeriesDisplayProps } from '@/series/SeriesDisplay';
import { useChartTheme } from '@/theme/ChartThemeProvider';
import { useCkGraphics } from '@chartext/canvaskit';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

export type DisplayContextProps = {
  seriesDisplays: SeriesDisplay[];
  xDisplay: CoordDisplay<CoordType>;
  yDisplay: CoordDisplay<CoordType>;
  plotRect: Rect<number>;
};

export type DisplayProviderProps = {
  plot: Plot;
  plotRect: Rect<number>;
};

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
          });
        /* case 'string':
          return new StringDisplay({
            data: data as string[],
            plotRect: this.rect,
            axis,
          }); */
        case 'date':
          return new DateCoordDisplay({
            axisType,
            data: values as Date[],
            plotRect,
          });
        default:
          console.error(`Type (${parsedType}) not supported.`);
          return null;
      }
    }
  }

  return null;
}

function createSeriesDisplay(props: SeriesDisplayProps, seriesType: SeriesType): SeriesDisplay {
  switch (seriesType) {
    case 'line':
      return new LineSeries(props);
    case 'scatter':
      return new ScatterSeries(props);
    case 'box':
    case 'area':
    case 'bar':
    default:
      throw new Error(`Series type not implemented: ${seriesType}`);
  }
}

export const ChartDisplayContext = createContext<DisplayContextProps>({} as DisplayContextProps);
export const useChartDisplay = () => useContext(ChartDisplayContext);

export function ChartDisplayProvider(props: PropsWithChildren<DisplayProviderProps>) {
  const { children, plot, plotRect } = props;
  const { seriesTheme, paintRepository } = useChartTheme();
  const ckGraphics = useCkGraphics();

  const [displayContextProps, setDisplayContextProps] = useState<DisplayContextProps>();

  useEffect(() => {
    const { series, xProps, yProps } = plot;
    const { colors: seriesThemeColors } = seriesTheme;

    const xValues: CoordType[] = [];
    const yValues: CoordType[] = [];

    series.forEach(({ data }) => {
      data.forEach(({ x, y }) => {
        xValues.push(x);
        yValues.push(y);
      });
    });

    const xDisplay = createCoordDisplay('x', xValues, plotRect, xProps);

    if (!xDisplay) return;

    const yDisplay = createCoordDisplay('y', yValues, plotRect, yProps);

    if (!yDisplay) return;

    const seriesDisplays: SeriesDisplay[] = series.map((s, index) => {
      const seriesColor = seriesThemeColors[index % seriesThemeColors.length];
      const paintSet = paintRepository.getPaintSet(seriesColor ?? '');
      const seriesDisplayProps: SeriesDisplayProps = {
        ckGraphics,
        xDisplay,
        yDisplay,
        series: s,
        paintSet,
      };
      return createSeriesDisplay(seriesDisplayProps, s.type);
    });

    setDisplayContextProps({
      seriesDisplays,
      xDisplay,
      yDisplay,
      plotRect,
    });

    return () => {
      seriesDisplays.forEach((sd) => sd.delete());
    };
  }, [ckGraphics, paintRepository, plot, plotRect, seriesTheme]);

  /* useEffect(() => {
    return () => {
      displayContextProps.seriesDisplays.forEach((sd) => sd.delete());
    };
  }, [kGraphics, paintRepository, plot, plotRect, seriesTheme]); */

  return displayContextProps ? (
    <ChartDisplayContext.Provider value={displayContextProps}>
      {children}
    </ChartDisplayContext.Provider>
  ) : null;
}
