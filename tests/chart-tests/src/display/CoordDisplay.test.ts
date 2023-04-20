import { describe, expect, it } from 'vitest';
import { generateNumberData } from '@chartext/utils';
import { CoordDisplay } from '@chartext/chart';

describe('CoordDisplay', () => {
  it('rounds the number', () => {
    const foo = CoordDisplay.niceNum(49, false);

    console.log(foo);
  });

  it('rounds the min and max', () => {
    const data: number[] = generateNumberData(100, 'number');

    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);

    const [min, max, spacing] = CoordDisplay.roundedMinMax(minValue, maxValue, 10);

    expect(min, 'min is defined').toBeDefined();
  });
});
