import { describe, expect, it } from 'vitest';
import { NumberTickLayout } from '@chartext/chart/axis/NumberTickLayout';

describe('NumberTickLayout tests', () => {
  it('should create DateTickLayout', () => {
    const tickLayout: NumberTickLayout = new NumberTickLayout([-99, 99], 10);

    expect(tickLayout.min, 'min should equal -100').eq(-100);
    expect(tickLayout.max, 'max should equal 100').eq(100);
  });
});
