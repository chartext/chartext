import { describe, expect, it } from 'vitest';
import { CoordDisplay } from '@/coord/CoordDisplay';
import { generateData } from '@/utils/generateData';

describe('CoordDisplay tests', () => {
  it('rounds the number', () => {
    const roundedNumber = CoordDisplay.niceNum(49, false);

    expect(roundedNumber, 'roundedNumber equals 50').equals(50);
  });

  it('rounds the min and max', () => {
    const data: number[] = generateData(-123, 152, 1000);

    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);

    const [min, max, spacing] = CoordDisplay.roundedMinMax(minValue, maxValue, 10);

    console.log({
      min,
      max,
      spacing,
    });

    expect(min, 'min is defined').toBeDefined();
    expect(max, 'max is defined').toBeDefined();
    expect(spacing, 'spacing is defined').toBeDefined();
  });
});
