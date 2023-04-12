import _ from 'lodash';
import { Plot } from '@/plot/Plot.types';
import { CoordType, Series, SeriesType, XY } from '@/series/Series.types';

export type DummySeriesProps = {
  seriesType: SeriesType;
  seriesCount: number;
  dataCount: number;
};

export type DummyDataType = 'number' | 'currency' | 'date';

export type DummyPlotProps = {
  xType: DummyDataType;
  yType: DummyDataType;
  dummySeries: DummySeriesProps[];
};

// type Formatter = (value: number) => string;

/* const numberFormatter: Formatter = Intl.NumberFormat('en-US', {
  notation: 'compact',
}).format;

const currencyFormatter: Formatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
}).format; */

export function generateNumberData(dataCount: number, dataType: DummyDataType): number[] {
  const floating = dataType === 'currency';

  const min = _.random(-500, 10);
  const max = _.random(11, 500);

  return Array.from({ length: dataCount }, () => _.random(min, max, floating));
}

export function generateData(dataCount: number, dataType: DummyDataType): CoordType[] {
  switch (dataType) {
    case 'currency':
    case 'number':
      return generateNumberData(dataCount, dataType);
    default:
      throw new Error(`Unsupported dataType: ${dataType}`);
  }
}

export function generatePlot(props?: DummyPlotProps): Plot {
  const {
    xType = 'number',
    yType = 'number',
    dummySeries = [
      {
        seriesType: 'line',
        dataCount: _.random(50, 200),
        seriesCount: _.random(2, 5),
      },
      {
        seriesType: 'scatter',
        dataCount: _.random(50, 200),
        seriesCount: _.random(2, 5),
      },
    ],
  } = props ?? {};

  /* const xFormatter = formatter(xType);
  const yFormatter = formatter(yType); */

  const series: Series[] = dummySeries.flatMap(
    ({ seriesCount, dataCount, seriesType }, index: number) =>
      Array.from({ length: seriesCount }, (__, seriesIndex: number) => {
        const xData: CoordType[] = generateData(dataCount, xType);
        const yData: CoordType[] = generateData(dataCount, yType);

        const data: XY[] = xData.map((x, xDataIndex) => ({ x, y: yData[xDataIndex] }));

        return {
          type: seriesType,
          name: `series ${index + 1}.${seriesIndex + 1}`,
          data,
        };
      }),
  );

  return {
    series,
  };
}

/* export function formatter(dataType: DummyDataType) {
  switch (dataType) {
    case 'currency':
      return currencyFormatter;
    case 'number':
      return numberFormatter;
    default:
      throw new Error(`invalid valueType: ${dataType}`);
  }
} */
