import { isLeapYear, nextSaturday, previousSunday } from 'date-fns';
import { random } from 'lodash';

export type DatePart =
  | 'year'
  | 'quarter'
  | 'month'
  | 'week'
  | 'dayOfMonth'
  | 'hours'
  | 'minutes'
  | 'seconds'
  | 'milliseconds';

export enum Months {
  Jan,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sep,
  Oct,
  Nov,
  Dec,
}

export type MaxDayOfMonth = 28 | 29 | 30 | 31;

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

export function maxDayOfMonth(month: Months, year: number): MaxDayOfMonth {
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

  const year = random(yearRange[0], yearRange[1]);
  const monthIndex = random(monthRange[0], monthRange[1]);

  const maxDofM: MaxDayOfMonth = maxDayOfMonth(monthIndex, year);

  const dayOfMonth = random(
    dayOfMonthRange[0],
    dayOfMonthRange[1] < maxDofM ? dayOfMonthRange[1] : maxDofM,
  );

  const hour = random(hourRange[0], hourRange[1]);
  const minute = random(minuteRange[0], minuteRange[1]);
  const second = random(secondRange[0], secondRange[1]);
  const millisecond = random(millisecondRange[0], millisecondRange[1]);

  return new Date(year, monthIndex, dayOfMonth, hour, minute, second, millisecond);
}

export function roundDate(date: Date, datePart: DatePart, direction?: 'floor' | 'ceiling'): Date {
  // const adjustment = direction === 'ceiling' ? 1 : 0;

  /* const seconds = (() => {
    const dateSeconds = date.getSeconds();

    if (datePart === 'seconds') {
      return dateSeconds + (direction === 'floor' || date.getMilliseconds() < 500 ? 0 : 1);
    }

    return dateSeconds;
  })(); */

  switch (datePart) {
    case 'seconds': {
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
    case 'minutes': {
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
    case 'hours': {
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

      return new Date(date.getFullYear(), date.getMonth(), date.getDate() + adjustment, 0);
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
