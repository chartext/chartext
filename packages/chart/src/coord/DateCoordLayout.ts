import { max, min } from 'date-fns';
import { CoordLayout } from '@/coord/CoordLayout';
import { Direction } from '@/layout/ChartLayout.types';
import { dateTicks } from '@/utils/ticks';
import { addDatePart } from '@/utils/dates';
import { DatePart } from '@/utils/dates.types';

export class DateCoordLayout extends CoordLayout<Date> {
  readonly #datePart: DatePart;

  constructor(
    values: Date[],
    maxTicks: number,
    direction: Direction,
    // coordFormatter?: CoordFormatter,
  ) {
    const minDate = min(values);
    const maxDate = max(values);

    const [roundedMin, roundedMax, spacing, datePart] = dateTicks(
      minDate,
      maxDate,
      maxTicks,
    );

    const ticks: Date[] = [];

    for (
      let tick = roundedMin;
      tick <= roundedMax;
      tick = addDatePart(tick, datePart, spacing)
    ) {
      ticks.push(tick);
    }

    const formatter = (() => {
      switch (datePart) {
        case 'year':
        case 'quarter':
        case 'month':
        case 'week':
        case 'dayOfMonth':
        case 'hour':
        case 'minute':
        case 'second':
        case 'millisecond':
          return new Intl.DateTimeFormat('default', {});
      }
    })();

    super(roundedMin, roundedMax, ticks, direction, formatter);

    this.#datePart = datePart;
  }

  protected override toNumber(value: Date): number {
    return value.getTime();
  }
}
