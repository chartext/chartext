import { describe } from 'vitest';
import { numberTicks } from '@/utils/ticks';

describe('ticks test', () => {
  it('should create number ticks', () => {
    const foo = numberTicks(-99, 99, 10);
    console.log(foo);
  });
});
