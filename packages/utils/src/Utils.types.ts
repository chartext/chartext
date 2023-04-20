import { SeriesType } from '@chartext/chart';

export type RandomDataType = 'number' | 'currency' | 'date';

export type RandomSeriesProps = {
  dataCount: number;
  index: number;
  type: SeriesType;
  xType: RandomDataType;
  yType: RandomDataType;
};

export type SeriesConfig = {
  count: number;
  dataCount: number;
  type: SeriesType;
};

export type RandomPlotProps = {
  series: SeriesConfig[];
  xType: RandomDataType;
  yType: RandomDataType;
};

export type DatePartRange = [start: number, end: number];

export type DateRandomProps = {
  yearRange?: DatePartRange;
  monthRange?: DatePartRange;
  dayOfMonthRange?: DatePartRange;
  hourRange?: DatePartRange;
  minuteRange?: DatePartRange;
  secondRange?: DatePartRange;
  millisecondRange?: DatePartRange;
};
