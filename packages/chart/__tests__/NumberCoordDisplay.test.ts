import _ from 'lodash';
import { describe, it } from 'vitest';
import { generateNumberData } from '@/data/DummyData';
import { CoordDisplay } from '@/display/CoordDisplay';
import NumberCoordDisplay from '@/display/NumberCoordDisplay';

describe('NumberCoordDisplay', () => {
  it.only('Does some shit', () => {
    const data: number[] = generateNumberData(100, 'number');

    const minValue = _.min(data) ?? 0;
    const maxValue = _.max(data) ?? 0;

    const [min, max, spacing] = CoordDisplay.roundedMinMax(minValue, maxValue, 10);

    const xDisplay = new NumberCoordDisplay({
      axis: 'x',
      data,
    });

    const yDisplay = new NumberCoordDisplay({
      axis: 'y',
      data,
    });

    console.log({
      min,
      max,
      spacing,
      xDisplay,
      yDisplay,
    });
  });
});
