import {
  addMonths,
  addQuarters,
  differenceInMonths,
  differenceInQuarters,
  differenceInSeconds,
  max,
  min,
} from 'date-fns';
import { AxisTick, AxisTickLayout } from '@/axis/Axis.types';
import { NumberTickLayout } from '@/axis/NumberTickLayout';
import { CoordMinMax, NumberFormatter } from '@/coord/Coord.types';
import { Months, roundDate } from '@/utils/dates';

const monthFormatter = Intl.DateTimeFormat(undefined, {
  month: 'short',
});

const numberFormatter: NumberFormatter = {
  format(value: number): string {
    return value.toString();
  },
};

export class DateTickLayout implements AxisTickLayout<Date> {
  readonly #min: Date;
  readonly #max: Date;
  readonly #ticks: AxisTick[] = [];

  constructor(values: Date[] | CoordMinMax<Date>, maxTicks: number) {
    const minDate: Date = min(values);
    const maxDate: Date = max(values);

    // millisecond
    const secondDiff = Math.abs(differenceInSeconds(minDate, maxDate));

    if (secondDiff < 120) {
      const numberTickLayout = new NumberTickLayout(
        [minDate.getMilliseconds(), maxDate.getMilliseconds()],
        maxTicks,
        numberFormatter,
      );

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
    }

    // second
    // minute
    // hour
    // day

    // month
    const monthDiff = Math.abs(differenceInMonths(minDate, maxDate));

    if (monthDiff <= 12) {
      this.#min = roundDate(minDate, 'month', 'floor');
      this.#max = roundDate(maxDate, 'month', 'ceiling');

      for (let tick = this.#min; tick <= this.#max; tick = addMonths(tick, 1)) {
        this.ticks.push({
          plotValue: tick.getTime(),
          display:
            tick.getMonth() === Months.Jan
              ? tick.getFullYear().toString()
              : monthFormatter.format(tick),
        });
      }

      return;
    }

    // quarter
    const quarterDiff = Math.abs(differenceInQuarters(minDate, maxDate));

    if (quarterDiff <= 12) {
      this.#min = roundDate(minDate, 'quarter', 'floor');
      this.#max = roundDate(maxDate, 'quarter', 'ceiling');

      for (
        let tick = this.#min;
        tick <= this.#max;
        tick = addQuarters(tick, 1)
      ) {
        this.ticks.push({
          plotValue: tick.getTime(),
          display:
            tick.getMonth() === Months.Jan
              ? tick.getFullYear().toString()
              : monthFormatter.format(tick),
        });
      }

      return;
    }

    // default year
    const numberTickLayout = new NumberTickLayout(
      [minDate.getFullYear(), maxDate.getFullYear()],
      maxTicks,
      numberFormatter,
    );

    this.#min = roundDate(minDate, 'year');
    this.#max = roundDate(maxDate, 'year');

    numberTickLayout.ticks.forEach(({ plotValue, display }) => {
      this.#ticks.push({
        plotValue: new Date(plotValue, Months.Jan).getTime(),
        display,
      });
    });
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
