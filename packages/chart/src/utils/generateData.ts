import { CoordType, XY } from '@/coord/Coord.types';
import { Plot } from '@/plot/Plot.types';
import { Series } from '@/series/Series.types';
import { RandomSeriesConfig, RandomSeriesProps } from '@/utils/generateData.types';
import { randomDate, randomInt, randomNumber } from '@/utils/random';

export function generateIntData(min: number, max: number, dataCount: number): number[] {
  return Array.from({ length: dataCount }, () => randomInt(min, max));
}

export function generateDateData(min: Date, max: Date, dataCount: number): Date[] {
  return Array.from({ length: dataCount }, () => randomDate(min, max));
}

export function generateData<T extends CoordType>(min: T, max: T, dataCount: number): T[] {
  switch (typeof min) {
    case 'number':
      if (Number.isInteger(min) && Number.isInteger(max)) {
        return Array.from({ length: dataCount }, () =>
          randomInt(min as number, max as number),
        ) as T[];
      }

      return Array.from({ length: dataCount }, () =>
        randomNumber(min as number, max as number),
      ) as T[];
    case 'object':
      if (min instanceof Date) {
        return Array.from({ length: dataCount }, () => randomDate(min as Date, max as Date)) as T[];
      }
  }

  return [];
}

export function generateSeries<X extends CoordType, Y extends CoordType>(
  props: RandomSeriesProps<X, Y>,
): Series {
  const {
    dataCount,
    index,
    type,
    xMinMax: [xMin, xMax],
    yMinMax: [yMin, yMax],
  } = props;

  const xData: CoordType[] = generateData(xMin, xMax, dataCount);
  const yData: CoordType[] = generateData(yMin, yMax, dataCount);

  const data: XY[] = xData.map((x, xDataIndex): XY => ({ x, y: yData[xDataIndex] ?? 0 }));

  return {
    type,
    name: `${type} series ${index} - [${dataCount}]`,
    data,
  };
}

export function generatePlot<X extends CoordType, Y extends CoordType>(
  series: RandomSeriesConfig<X, Y>[],
): Plot {
  const randomSeriesArr: Series[] = [];

  series.forEach((seriesConfig) => {
    const { count, dataCount, type, xMinMax, yMinMax } = seriesConfig;

    for (let seriesIndex = 0; seriesIndex < count; seriesIndex += 1) {
      const index = randomSeriesArr.length;
      const randomSeries = generateSeries({
        index,
        xMinMax,
        yMinMax,
        dataCount,
        type,
      });
      randomSeriesArr.push(randomSeries);
    }
  });

  return {
    series: randomSeriesArr,
  };
}
