import { describe, it } from 'vitest';
import { DateTickLayout } from '@chartext/chart/axis/DateTickLayout';
import { MonthIndex } from '@chartext/chart/index';

describe('DateTickLayout tests', () => {
  it('should create month ticks', () => {
    const tickLayout: DateTickLayout = new DateTickLayout(
      [new Date(2020, MonthIndex.Jan, 1), new Date(2020, MonthIndex.Dec, 31)],
      10,
    );

    console.log({
      min: tickLayout.min,
      max: tickLayout.max,
      ticks: tickLayout.ticks,
    });
  });

  it('should create quarter ticks', () => {
    const tickLayout: DateTickLayout = new DateTickLayout(
      [new Date(2018, MonthIndex.Jan, 1), new Date(2020, MonthIndex.Dec, 31)],
      10,
    );

    console.log({
      min: tickLayout.min,
      max: tickLayout.max,
      ticks: tickLayout.ticks,
    });
  });

  it('should create year ticks', () => {
    const tickLayout: DateTickLayout = new DateTickLayout(
      [new Date(2020, MonthIndex.Jan, 1), new Date(2027, MonthIndex.Dec, 31)],
      10,
    );

    console.log({
      min: tickLayout.min,
      max: tickLayout.max,
      ticks: tickLayout.ticks,
    });
  });
});
