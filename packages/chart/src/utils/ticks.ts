import { differenceInSeconds, differenceInYears } from 'date-fns';
import { DatePart } from '@/utils/dates.types';

/**
 * https://stackoverflow.com/questions/8506881/nice-label-algorithm-for-charts-with-minimum-ticks/16363437
 */
function niceNum(range: number, round: boolean): number {
  const exponent = Math.floor(Math.log10(range));
  const fraction = range / 10 ** exponent;

  const tickInterval = (() => {
    if (round) {
      if (fraction < 1.5) return 1;
      if (fraction < 3) return 2;
      if (fraction < 7) return 5;
    } else {
      if (fraction <= 1) return 1;
      if (fraction <= 2) return 2;
      if (fraction <= 5) return 5;
    }
    return 10;
  })();

  return tickInterval * 10 ** exponent;
}

export function numberTicks(
  min: number,
  max: number,
  maxTicks: number,
): [min: number, max: number, spacing: number] {
  const range = max - min;
  const niceRange = niceNum(range, false);
  const spacing = niceNum(niceRange / (maxTicks - 1), true);
  const niceMin = Math.floor(min / spacing) * spacing;
  const niceMax = Math.ceil(max / spacing) * spacing;

  return [niceMin, niceMax, spacing];
}

export function dateTicks(
  min: Date,
  max: Date,
  maxTicks: number,
): [min: Date, max: Date, spacing: number, datePart: DatePart] {
  const secondDiff = Math.abs(differenceInSeconds(min, max));

  if (secondDiff < maxTicks) {
    const [msMin, msMax, msSpacing] = numberTicks(
      min.getMilliseconds(),
      max.getMilliseconds(),
      maxTicks,
    );

    const roundedMin = new Date(
      min.getFullYear(),
      min.getMonth(),
      min.getDate(),
      min.getHours(),
      min.getMinutes(),
      min.getSeconds(),
      msMin,
    );

    const roundedMax = new Date(
      max.getFullYear(),
      max.getMonth(),
      max.getDate(),
      max.getHours(),
      max.getMinutes(),
      max.getSeconds(),
      msMax,
    );

    return [roundedMin, roundedMax, msSpacing, 'millisecond'];
  }

  const yearDiff = differenceInYears(min, max);

  if (yearDiff >= 2) {
    const [yearMin, yearMax, yearSpacing] = numberTicks(
      min.getFullYear(),
      max.getFullYear(),
      maxTicks,
    );

    return [
      new Date(yearMin, 1, 1),
      new Date(yearMax, 1, 1),
      yearSpacing,
      'year',
    ];
  }

  throw new Error('test');
}
