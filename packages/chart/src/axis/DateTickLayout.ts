import {
  addDays,
  addMonths,
  addQuarters,
  addYears,
  differenceInDays,
  differenceInMonths,
  differenceInQuarters,
  format,
  max,
  min,
} from 'date-fns';
import { AxisTick, AxisTickLayout } from '@chartext/chart/axis/Axis.types';
import { NumberTickLayout } from '@chartext/chart/axis/NumberTickLayout';
import { CoordMinMax, DateFormatter } from '@chartext/chart/coord/Coord.types';
import { MonthIndex, roundDate } from '@chartext/chart/utils/dates';

/* const minuteFormatter: DateFormatter = new Intl.DateTimeFormat(undefined, {
  timeStyle: 'short',
});

const hourFormatter: DateFormatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',
}); */

const dayOfMonthFormatter: DateFormatter = {
  format(date: Date) {
    return format(date, 'DD');
  },
};

const monthFormatter: DateFormatter = {
  format(date: Date) {
    return format(date, 'MMM');
  },
};

const yearFormatter: DateFormatter = {
  format(date: Date) {
    return format(date, 'yyyy');
  },
};

const dateFormatter: DateFormatter = {
  format(date: Date): string {
    if (date.getMonth() === MonthIndex.Jan && date.getDate() === 1) {
      return yearFormatter.format(date);
    }

    if (date.getDate() === 1) {
      return monthFormatter.format(date);
    }

    return dayOfMonthFormatter.format(date);
  },
};

export class DateTickLayout implements AxisTickLayout<Date> {
  readonly #min: Date;
  readonly #max: Date;
  readonly #ticks: AxisTick[];

  private static buildTicks(
    minDate: Date,
    maxDate: Date,
    spacing: number,
    nextDate: (date: Date, amount: number) => Date,
  ): AxisTick[] {
    const ticks: AxisTick[] = [];

    for (
      let tickDate = minDate;
      tickDate <= maxDate;
      tickDate = nextDate(tickDate, spacing)
    ) {
      ticks.push({
        plotValue: tickDate.getTime(),
        display: dateFormatter.format(tickDate),
      });
    }

    const tickMaxDate = ticks.findLast(Boolean)?.plotValue;

    if (tickMaxDate && tickMaxDate < maxDate.getTime()) {
      ticks.push({
        plotValue: maxDate.getTime(),
        display: dateFormatter.format(maxDate),
      });
    }

    return ticks;
  }

  constructor(values: Date[] | CoordMinMax<Date>, maxTicks: number) {
    const minDate: Date = min(values);
    const maxDate: Date = max(values);

    // millisecond
    /* const secondDiff = Math.abs(differenceInSeconds(minDate, maxDate));

    if (secondDiff < 120) {
      const numberTickLayout = new NumberTickLayout(
        [minDate.getMilliseconds(), maxDate.getMilliseconds()],
        maxTicks,
        numberFormatter,
      );

      const tickConfig = NumberTickLayout.tickConfig(
        minDate.getMilliseconds(),
        maxDate.getMilliseconds(),
        maxTicks,
      );
      const numberToDate: NumberToDate = (ms: number) =>
        new Date(
          maxDate.getFullYear(),
          maxDate.getMonth(),
          maxDate.getDate(),
          maxDate.getHours(),
          maxDate.getMinutes(),
          maxDate.getSeconds(),
          ms,
        );

      const dateFormatter: DateFormatter = {
        format(date: Date): string {},
      };

      this.#ticks = this.buildTicksFromNumbers(tickConfig, numberToDate);

      this.#min = new Date(
        minDate.getFullYear(),
        minDate.getMonth(),
        minDate.getDate(),
        minDate.getHours(),
        minDate.getMinutes(),
        minDate.getSeconds(),
        numberTickLayout.min,
      );

      this.#max = new Date(
        maxDate.getFullYear(),
        maxDate.getMonth(),
        maxDate.getDate(),
        maxDate.getHours(),
        maxDate.getMinutes(),
        maxDate.getSeconds(),
        numberTickLayout.max,
      );

      numberTickLayout.ticks.forEach(({ plotValue, display }) => {
        this.#ticks.push({
          plotValue: new Date(
            maxDate.getFullYear(),
            maxDate.getMonth(),
            maxDate.getDate(),
            maxDate.getHours(),
            maxDate.getMinutes(),
            maxDate.getSeconds(),
            plotValue,
          ).getTime(),
          display,
        });
      });

      return;
    } */

    // second
    // minute
    // hour
    // day
    const { calcSpacing } = NumberTickLayout;
    const { buildTicks } = DateTickLayout;

    const dayDiff = Math.abs(differenceInDays(minDate, maxDate));

    if (dayDiff <= 90) {
      this.#min = roundDate(minDate, 'dayOfMonth', 'floor');
      this.#max = roundDate(maxDate, 'dayOfMonth', 'ceiling');

      const roundedDayDiff = Math.abs(differenceInDays(this.#min, this.#max));

      if (dayDiff <= maxTicks) {
        this.#ticks = buildTicks(this.#min, this.#max, 1, addDays);
      } else {
        const spacing = calcSpacing(0, roundedDayDiff, maxTicks);

        this.#ticks = buildTicks(this.#min, this.#max, spacing, addDays);
      }

      return;
    }

    // month
    const monthDiff = Math.abs(differenceInMonths(minDate, maxDate));

    if (monthDiff <= 12) {
      this.#min = roundDate(minDate, 'month', 'floor');
      this.#max = roundDate(maxDate, 'month', 'ceiling');

      this.#ticks = buildTicks(this.#min, this.#max, 1, addMonths);

      return;
    }

    // quarter
    const quarterDiff = Math.abs(differenceInQuarters(minDate, maxDate));

    if (quarterDiff <= 12) {
      this.#min = roundDate(minDate, 'quarter', 'floor');
      this.#max = roundDate(maxDate, 'quarter', 'ceiling');

      this.#ticks = buildTicks(this.#min, this.#max, 1, addQuarters);

      return;
    }

    this.#min = roundDate(minDate, 'year');
    this.#max = roundDate(maxDate, 'year');

    this.#ticks = buildTicks(this.#min, this.#max, 1, addYears);
  }

  get min(): Date {
    return this.#min;
  }

  get max(): Date {
    return this.#max;
  }

  get ticks(): AxisTick[] {
    return this.#ticks;
  }
}
