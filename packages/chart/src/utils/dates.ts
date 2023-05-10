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

export type DatePart =
  | 'year'
  | 'quarter'
  | 'month'
  | 'week'
  | 'dayOfMonth'
  | 'hour'
  | 'minute'
  | 'second'
  | 'millisecond';

export const Months = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
} as const;

export type DateSpacing = [datePart: DatePart, diff: number];

export function maxDayOfMonth(
  year: number,
  monthIndex: number,
): 28 | 29 | 30 | 31 {
  switch (monthIndex) {
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
      throw new Error(`Invalid monthIndex: ${monthIndex}`);
  }
}

export function roundDate(
  date: Date,
  datePart: DatePart,
  direction?: 'floor' | 'ceiling',
): Date {
  switch (datePart) {
    case 'second': {
      const adjustment =
        direction === 'floor' || (!direction && date.getMilliseconds() < 500)
          ? 0
          : 1;

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
      const adjustment =
        direction === 'floor' || (!direction && date.getSeconds() < 30) ? 0 : 1;
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes() + adjustment,
      );
    }
    case 'hour': {
      const adjustment =
        direction === 'floor' || (!direction && date.getMinutes() < 30) ? 0 : 1;
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours() + adjustment,
      );
    }
    case 'dayOfMonth': {
      const adjustment =
        direction === 'floor' || (!direction && date.getHours() < 12) ? 0 : 1;
      return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + adjustment,
        0,
      );
    }
    case 'week': {
      const adjustment =
        direction === 'floor' || (!direction && date.getDay() < 4) ? 0 : 1;
      return adjustment === 0 ? previousSunday(date) : nextSaturday(date);
    }
    case 'month': {
      const maxDay: number = maxDayOfMonth(date.getFullYear(), date.getMonth());
      const adjustment =
        direction === 'floor' || (!direction && date.getDate() < maxDay / 2)
          ? 0
          : 1;
      return new Date(date.getFullYear(), date.getMonth() + adjustment);
    }
    case 'quarter': {
      const month = date.getMonth();

      let quarterMonth;

      if (month === Months.Jan || month === Months.Dec)
        quarterMonth = Months.Jan;
      else if (month <= Months.Apr) quarterMonth = Months.Apr;
      else if (month <= Months.Jul) quarterMonth = Months.Jul;
      else quarterMonth = Months.Oct;

      // const adjustment =
      //   direction === 'floor' || (!direction && date.getMonth());

      return new Date(date.getFullYear(), quarterMonth);
    }
    case 'year': {
      const adjustment =
        direction === 'floor' || (!direction && date.getMonth() < 6) ? 0 : 1;
      return new Date(date.getFullYear() + adjustment, 0);
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
