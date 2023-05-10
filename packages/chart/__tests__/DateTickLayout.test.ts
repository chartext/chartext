import { describe } from 'vitest';
import { DateTickLayout } from '@/axis/DateTickLayout';

describe('DateTickLayout tests', () => {
  it('should create month ticks', () => {
    const tickLayout: DateTickLayout = new DateTickLayout(
      [new Date('2020-01-01'), new Date('2020-12-31')],
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
      [new Date('2020-01-01'), new Date('2022-12-31')],
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
      [new Date('2020-01-01'), new Date('2027-12-31')],
      10,
    );

    console.log({
      min: tickLayout.min,
      max: tickLayout.max,
      ticks: tickLayout.ticks,
    });
  });
});
