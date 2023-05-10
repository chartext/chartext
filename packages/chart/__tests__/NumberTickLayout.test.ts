import { describe } from 'vitest';
import { NumberTickLayout } from '@/axis/NumberTickLayout';

describe('NumberTickLayout tests', () => {
  it('should create DateTickLayout', () => {
    const tickLayout: NumberTickLayout = new NumberTickLayout([-99, 99], 10);

    console.log('tickLayout', tickLayout);
  });
});
