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

export type DateSpacing = [datePart: DatePart, diff: number];
