import { Rect } from '@/Chart.types';
import { CoordDisplay } from '@/coord/CoordDisplay';
import { NumberCoordDisplay } from '@/coord/NumberCoordDisplay';
import { generateIntData } from '@/utils/generateData';
import { describe, it } from 'vitest';

describe('NumberCoordDisplay', () => {
  it('Logs number displays', () => {
    const data: number[] = generateIntData(-323, 678, 100);

    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);

    const [min, max, spacing] = CoordDisplay.roundedMinMax(minValue, maxValue, 10);

    const plotRect: Rect<number> = {
      top: 0,
      right: 300,
      left: 0,
      bottom: 500,
    };

    const xDisplay = new NumberCoordDisplay({
      axisType: 'x',
      data,
      plotRect,
    });

    const yDisplay = new NumberCoordDisplay({
      axisType: 'y',
      data,
      plotRect,
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
