import _ from 'lodash';
import { CoordDisplay } from '@/display/CoordDisplay';
import DateCoordDisplay from '@/display/DateCoordDisplay';
import NumberCoordDisplay from '@/display/NumberCoordDisplay';
import { Plot } from '@/plot/Plot.types';
import { CoordProps, CoordType, SeriesData, SeriesType } from '@/series/Series.types';

export default class PlotDisplay {
  readonly xDisplay: CoordDisplay<CoordType>;

  readonly yDisplay: CoordDisplay<CoordType>;

  readonly seriesTypes: Set<SeriesType>;

  static toCoordDisplay(
    axis: 'x' | 'y',
    data: (CoordType | undefined)[],
    coordProps?: CoordProps,
  ): CoordDisplay<CoordType> {
    const parser = coordProps?.parser;

    for (let index = 0; index <= data.length; index += 1) {
      const item = data[index];

      if (item) {
        const val: CoordType | undefined = parser ? parser(item) : item;

        if (val) {
          const parsedType: 'string' | 'date' | 'number' | undefined = (() => {
            if (typeof val === 'string') {
              const date = Date.parse(val);
              if (date) {
                return 'date';
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
          })();

          switch (parsedType) {
            case 'number':
              return new NumberCoordDisplay({
                axis,
                data: data as number[],
              });
            /* case 'string':
              return new StringDisplay({
                data: data as string[],
                plotRect: this.rect,
                axis,
              }); */
            case 'date':
              return new DateCoordDisplay({
                axis,
                data: data as Date[],
              });
            default:
              throw new Error(`Type (${parsedType}) not supported.`);
          }
        }
      }
    }

    throw new Error('Check your data');
  }

  constructor(plot?: Plot | undefined) {
    if (plot) {
      const { series, xProps, yProps } = plot;
      const seriesData: SeriesData = series.flatMap((s) => s.data);
      const xArr: (CoordType | undefined)[] = seriesData.map((xy) => xy?.x);
      const yArr: (CoordType | undefined)[] = seriesData.map((xy) => xy?.y);

      // check type of coordinate partial

      // multi thread this and wait

      this.xDisplay = PlotDisplay.toCoordDisplay('x', xArr, xProps);
      this.yDisplay = PlotDisplay.toCoordDisplay('y', yArr, yProps);

      this.seriesTypes = new Set(series.map((s) => s.type));
    } else {
      this.seriesTypes = new Set();
      this.xDisplay = new NumberCoordDisplay({
        axis: 'x',
        data: [-100, 100],
        maxTicks: 10,
      });
      this.yDisplay = new NumberCoordDisplay({
        axis: 'y',
        data: [-100, 100],
        maxTicks: 10,
      });
    }
  }
}
