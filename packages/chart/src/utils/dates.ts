import {
  addDays,
  addHours,
  addMilliseconds,
  addMinutes,
  addMonths,
  addQuarters,
  addSeconds,
  addWeeks,
  addYears,
  isLeapYear,
  nextSaturday,
  previousSunday,
} from 'date-fns';
import { DatePart, Months } from '@/utils/dates.types';

export function maxDayOfMonth(month: Months, year: number): 28 | 29 | 30 | 31 {
  switch (month) {
    case Months.Jan:
    case Months.Mar:
    case Months.May:
    case Months.Jul:
    case Months.Aug:
    case Months.Oct:
    case Months.Dec:
      return 31;
    case Months.Apr:
    case Months.Jun:
    case Months.Sep:
    case Months.Nov:
      return 30;
    case Months.Feb: {
      return isLeapYear(new Date(year, Months.Feb, 1)) ? 29 : 28;
    }
    default:
      throw new Error('Invalid month', { cause: month });
  }
}

export function roundDate(
  date: Date,
  datePart: DatePart,
  direction?: 'floor' | 'ceiling',
): Date {
  // const adjustment = direction === 'ceiling' ? 1 : 0;

  /* const seconds = (() => {
    const dateSeconds = date.getSeconds();

    if (datePart === 'seconds') {
      return dateSeconds + (direction === 'floor' || date.getMilliseconds() < 500 ? 0 : 1);
    }

    return dateSeconds;
  })(); */

  switch (datePart) {
    case 'second': {
      const adjustment = (() => {
        if (!direction) {
          return date.getMilliseconds() < 500 ? 0 : 1;
        }

        return direction === 'ceiling' ? 1 : 0;
      })();

      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds() + adjustment,
      );
    }
    case 'minute': {
      const adjustment = (() => {
        if (!direction) {
          return date.getSeconds() < 30 ? 0 : 1;
        }

        return direction === 'ceiling' ? 1 : 0;
      })();

      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes() + adjustment,
      );
    }
    case 'hour': {
      const adjustment = (() => {
        if (!direction) {
          return date.getMinutes() < 30 ? 0 : 1;
        }

        return direction === 'ceiling' ? 1 : 0;
      })();

      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours() + adjustment,
      );
    }
    case 'dayOfMonth': {
      const adjustment = (() => {
        if (!direction) {
          return date.getHours() < 12 ? 0 : 1;
        }

        return direction === 'ceiling' ? 1 : 0;
      })();

      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + adjustment,
        0,
      );
    }
    case 'week': {
      const adjustment = (() => {
        if (!direction) {
          return date.getDay() < 4 ? 0 : 1;
        }

        return direction === 'ceiling' ? 1 : 0;
      })();

      return adjustment === 0 ? previousSunday(date) : nextSaturday(date);
    }
    default:
      return date;
  }
}

export function addDatePart(
  date: Date,
  datePart: DatePart,
  amount: number,
): Date {
  switch (datePart) {
    case 'year':
      return addYears(date, amount);
    case 'quarter':
      return addQuarters(date, amount);
    case 'month':
      return addMonths(date, amount);
    case 'week':
      return addWeeks(date, amount);
    case 'dayOfMonth':
      return addDays(date, amount);
    case 'hour':
      return addHours(date, amount);
    case 'minute':
      return addMinutes(date, amount);
    case 'second':
      return addSeconds(date, amount);
    case 'millisecond':
      return addMilliseconds(date, amount);
  }
}