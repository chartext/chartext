import { CoordType, MaxDayOfMonth, Plot, Series, XY, maxDayOfMonth } from '@chartext/chart';
import { DateRandomProps, RandomDataType, RandomPlotProps, RandomSeriesProps } from '@/Utils.types';

export function randomNum(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function randomInt(min: number, max: number) {
  const ceilMin = Math.ceil(min);
  const floorMax = Math.floor(max);
  return Math.floor(Math.random() * (floorMax - ceilMin) + ceilMin);
}

export function generateNumberData(dataCount: number, dataType: RandomDataType): number[] {
  // const floating = dataType === 'currency';

  const min = randomInt(-500, 10);
  const max = randomInt(11, 500);

  return Array.from({ length: dataCount }, () => randomInt(min, max));
}

export function randomDate(props?: DateRandomProps): Date {
  const {
    yearRange = [1980, 2020],
    monthRange = [0, 11],
    dayOfMonthRange = [0, 31],
    hourRange = [0, 23],
    minuteRange = [0, 59],
    secondRange = [0, 59],
    millisecondRange = [0, 999],
  } = props ?? {};

  const year = randomInt(yearRange[0], yearRange[1]);
  const monthIndex = randomInt(monthRange[0], monthRange[1]);

  const maxDofM: MaxDayOfMonth = maxDayOfMonth(monthIndex, year);

  const dayOfMonth = randomInt(
    dayOfMonthRange[0],
    dayOfMonthRange[1] < maxDofM ? dayOfMonthRange[1] : maxDofM,
  );

  const hour = randomInt(hourRange[0], hourRange[1]);
  const minute = randomInt(minuteRange[0], minuteRange[1]);
  const second = randomInt(secondRange[0], secondRange[1]);
  const millisecond = randomInt(millisecondRange[0], millisecondRange[1]);

  return new Date(year, monthIndex, dayOfMonth, hour, minute, second, millisecond);
}

export function generateData(dataCount: number, dataType: RandomDataType): CoordType[] {
  switch (dataType) {
    case 'currency':
    case 'number':
      return generateNumberData(dataCount, dataType);
    default:
      throw new Error(`Unsupported dataType: ${dataType}`);
  }
}

export function generateSeries(props: RandomSeriesProps) {
  const { dataCount, index, type, xType, yType } = props;

  const xData: CoordType[] = generateData(dataCount, xType);
  const yData: CoordType[] = generateData(dataCount, yType);

  const data: XY[] = xData.map((x, xDataIndex): XY => ({ x, y: yData[xDataIndex] ?? 0 }));

  return {
    type,
    name: `${type} series ${index} - [${dataCount}]`,
    data,
  };
}

export function generatePlot(props?: RandomPlotProps): Plot {
  const {
    xType = 'number',
    yType = 'number',
    series = [
      {
        type: 'line',
        count: randomNum(2, 5),
        dataCount: randomNum(50, 200),
      },
      {
        type: 'scatter',
        count: randomNum(2, 5),
        dataCount: randomNum(50, 200),
      },
    ],
  } = props ?? {};

  const randomSeriesArr: Series[] = [];

  series.forEach((seriesConfig) => {
    const { count, dataCount, type } = seriesConfig;

    for (let seriesIndex = 0; seriesIndex < count; seriesIndex += 1) {
      const index = randomSeriesArr.length;
      const randomSeries = generateSeries({
        index,
        xType,
        yType,
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
