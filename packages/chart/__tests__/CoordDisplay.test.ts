import { describe, expect, it } from 'vitest';
import _ from 'lodash';
import { generateNumberData } from '@/data/DummyData';
import { CoordDisplay } from '@/display/CoordDisplay';

describe('CoordDisplay', () => {
  it('rounds the number', () => {
    const foo = CoordDisplay.niceNum(49, false);

    console.log(foo);
  });

  it('rounds the min and max', () => {
    const data: number[] = generateNumberData(100, 'number');

    const minValue = _.min(data) ?? 0;
    const maxValue = _.max(data) ?? 0;

    const [min, max, spacing] = CoordDisplay.roundedMinMax(minValue, maxValue, 10);

    expect(min, 'min is defined').toBeDefined();
  });
});
