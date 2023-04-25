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

export type DateSpacing = [datePart: DatePart, diff: number];
