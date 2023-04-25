import {
  differenceInDays,
  differenceInHours,
  differenceInMilliseconds,
  differenceInMinutes,
  differenceInMonths,
  differenceInSeconds,
  differenceInYears,
  max,
  min,
} from 'date-fns';
import { roundDate } from '@/data/dates';
import { CoordDisplay, CoordDisplayProps } from '@/coord/coordDisplay';
import { DatePart, DateSpacing } from '@/data/dates.types';

export class DateCoordDisplay extends CoordDisplay<Date> {
  #min: number;
  #max: number;
  #spacing: number;
  #datePart: DatePart;

  constructor(props: CoordDisplayProps<Date>) {
    super(props);

    this.toNumber = this.toNumber.bind(this);

    const { data: dates, maxTicks = 10 } = props;

    const minDate = min(dates);
    const maxDate = max(dates);

    const [datePart, spacing] = DateCoordDisplay.spacing(minDate, maxDate);
    this.#datePart = datePart;

    if (this.#datePart === 'year') {
      const [minYear, maxYear, yearSpacing] = CoordDisplay.roundedMinMax(
        minDate.getFullYear(),
        maxDate.getFullYear(),
        maxTicks,
      );

      this.#spacing = yearSpacing;
      this.#min = new Date(minYear, 1, 1).getTime();
      this.#max = new Date(maxYear, 1, 1).getTime();
    } else if (this.#datePart === 'millisecond') {
      const [minMs, maxMs, msSpacing] = CoordDisplay.roundedMinMax(
        minDate.getMilliseconds(),
        maxDate.getMilliseconds(),
        maxTicks,
      );

      this.#spacing = msSpacing;
      this.#min = new Date(
        minDate.getFullYear(),
        minDate.getMonth(),
        minDate.getDate(),
        minDate.getHours(),
        minDate.getMinutes(),
        minDate.getSeconds(),
        minMs,
      ).getTime();
      this.#max = new Date(
        minDate.getFullYear(),
        minDate.getMonth(),
        minDate.getDate(),
        minDate.getHours(),
        minDate.getMinutes(),
        minDate.getSeconds(),
        maxMs,
      ).getTime();
    } else {
      this.#spacing = spacing;
      this.#min = roundDate(minDate, this.#datePart).getTime();
      this.#max = roundDate(maxDate, this.#datePart).getTime();
    }

    this.resize(props.plotRect);
  }

  static spacing(d1: Date, d2: Date): DateSpacing {
    const msDiff = Math.abs(differenceInMilliseconds(d1, d2));

    const sDiff = Math.abs(differenceInSeconds(d1, d2));
    if (sDiff <= 10) return ['millisecond', msDiff];

    const minDiff = Math.abs(differenceInMinutes(d1, d2));
    if (minDiff <= 10) return ['second', sDiff];

    const hDiff = Math.abs(differenceInHours(d1, d2));
    if (hDiff <= 10) return ['minute', minDiff];

    const dDiff = Math.abs(differenceInDays(d1, d2));
    if (dDiff <= 10) return ['hour', hDiff];

    const monDiff = differenceInMonths(d1, d2);
    if (monDiff <= 10) return ['dayOfMonth', dDiff];

    const yDiff = differenceInYears(d1, d2);
    if (yDiff <= 10) return ['month', monDiff];

    return ['year', yDiff];
  }

  get datePart(): DatePart {
    return this.#datePart;
  }

  override toNumber(t: Date): number {
    return t.getTime();
  }
  override get max(): number {
    return this.#max;
  }
  override get min(): number {
    return this.#min;
  }
  override get spacing(): number {
    return this.#spacing;
  }
}
