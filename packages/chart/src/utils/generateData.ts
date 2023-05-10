import { CoordType, XY } from '@/coord/Coord.types';
import { coordTypeName } from '@/utils/dataParsers';
import { Series } from '@/series/Series.types';
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

export function generateData<C extends CoordType>(
  min: C,
  max: C,
  dataCount: number,
): C[] {
  const coordType = coordTypeName(min);

  switch (coordType) {
    case 'integer':
      return Array.from({ length: dataCount }, () =>
        randomInt(min as number, max as number),
      ) as C[];
    case 'decimal':
      return Array.from({ length: dataCount }, () =>
        randomNumber(min as number, max as number),
      ) as C[];
    case 'date':
      return Array.from({ length: dataCount }, () =>
        randomDate(min as Date, max as Date),
      ) as C[];
  }

  return [];
}

export function generateSeries<X extends CoordType, Y extends CoordType>(
  props: RandomSeriesProps<X, Y>,
): Series<X, Y> {
  const {
    dataCount,
    index,
    type,
    xRange: { min: xMin, max: xMax },
    yRange: { min: yMin, max: yMax },
  } = props;

  const xData: X[] = generateData<X>(xMin, xMax, dataCount);
  const yData: Y[] = generateData<Y>(yMin, yMax, dataCount);

  const data: XY<X, Y>[] = xData.flatMap((x, xDataIndex): XY<X, Y>[] => {
    const y = yData[xDataIndex];
    return y === undefined ? [] : [{ x, y }];
  });

  return {
    seriesType: type,
    name: `${type} series ${index} - [${dataCount}]`,
    data,
  };
}

export function generateSeriesArr<X extends CoordType, Y extends CoordType>(
  seriesConfigs: RandomSeriesConfig<X, Y>[],
): Series<X, Y>[] {
  const randomSeriesArr: Series<X, Y>[] = [];

  seriesConfigs.forEach((seriesConfig) => {
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

  return randomSeriesArr;
}
