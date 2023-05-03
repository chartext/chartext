import { CoordType, XY } from '@/coord/Coord.types';
import { parseCoord } from '@/utils/dataParsers';
import { Plot, Series } from '@/series/Series.types';
import {
  RandomSeriesConfig,
  RandomSeriesProps,
} from '@/utils/generateData.types';
import { randomDate, randomInt, randomNumber } from '@/utils/random';

export function generateIntData(
  min: number,
  max: number,
  dataCount: number,
): number[] {
  return Array.from({ length: dataCount }, () => randomInt(min, max));
}

export function generateDateData(
  min: Date,
  max: Date,
  dataCount: number,
): Date[] {
  return Array.from({ length: dataCount }, () => randomDate(min, max));
}

export function generateData<T extends CoordType>(
  min: T,
  max: T,
  dataCount: number,
): T[] {
  const coordType = parseCoord(min);

  switch (coordType) {
    case 'integer':
      return Array.from({ length: dataCount }, () =>
        randomInt(min as number, max as number),
      ) as T[];
    case 'float':
      return Array.from({ length: dataCount }, () =>
        randomNumber(min as number, max as number),
      ) as T[];
    case 'date':
      return Array.from({ length: dataCount }, () =>
        randomDate(min as Date, max as Date),
      ) as T[];
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
    xRange: { min: xMin, max: xMax },
    yRange: { min: yMin, max: yMax },
  } = props;

  const xData: CoordType[] = generateData(xMin, xMax, dataCount);
  const yData: CoordType[] = generateData(yMin, yMax, dataCount);

  const data: XY[] = xData.map(
    (x, xDataIndex): XY => ({ x, y: yData[xDataIndex] ?? 0 }),
  );

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
    const { count, dataCount, type, xRange, yRange } = seriesConfig;

    for (let seriesIndex = 0; seriesIndex < count; seriesIndex += 1) {
      const index = randomSeriesArr.length;
      const randomSeries = generateSeries({
        index,
        xRange,
        yRange,
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
