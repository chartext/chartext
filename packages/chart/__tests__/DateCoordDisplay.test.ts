import { max, min } from 'date-fns';
import { describe, it } from 'vitest';
import { Rect } from '@/Chart.types';
import { randomDate, roundDate } from '@/data/Dates';
import DateCoordDisplay from '@/display/DateCoordDisplay';

describe('DateCoordDisplay', () => {
  it('min max test', () => {
    const dates: Date[] = [];
    for (let i = 0; i < 100; i += 1) {
      dates.push(
        randomDate({
          yearRange: [2020, 2020],
          monthRange: [3, 3],
          dayOfMonthRange: [2, 2],
          hourRange: [1, 1],
        }),
      );
    }

    const minDate = min(dates);
    const maxDate = max(dates);

    const spacing = DateCoordDisplay.spacing(minDate, maxDate);

    const roundedMinDate = roundDate(minDate, spacing[0], 'floor');
    const roundedMaxDate = roundDate(maxDate, spacing[0], 'ceiling');

    console.log({
      dates,
      minDate,
      maxDate,
      roundedMinDate,
      roundedMaxDate,
      spacing,
    });

    const plotRect: Rect<number> = {
      top: 0,
      right: 300,
      left: 0,
      bottom: 500,
    };

    const xDateDisplay = new DateCoordDisplay({
      data: dates,
      axisType: 'x',
      plotRect,
    });

    const yDateDisplay = new DateCoordDisplay({
      data: dates,
      axisType: 'y',
      plotRect,
    });

    console.log({
      'dateDisplay.min': xDateDisplay.min,
      'dateDisplay.max': xDateDisplay.max,
      'dateDisplay.datePart': xDateDisplay.datePart,
      'dateDisplay.spacing': xDateDisplay.spacing,
    });

    const dateMap: Map<Date, [x: number, y: number]> = new Map<Date, [x: number, y: number]>();

    dates
      .filter((date) => !dateMap.has(date))
      .forEach((date) => {
        dateMap.set(date, [
          xDateDisplay.valueToViewCoord(date, plotRect),
          yDateDisplay.valueToViewCoord(date, plotRect),
        ]);
      });

    console.log(dateMap);
  });
});
