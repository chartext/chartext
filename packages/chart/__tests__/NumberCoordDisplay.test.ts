import { describe, it } from 'vitest';
import { Rect } from '@/ChartLayout.types';
import { CoordDisplay } from '@/coord/CoordDisplay';
import { NumberCoordDisplay } from '@/coord/NumberCoordDisplay';
import { generateIntData } from '@/utils/generateData';

describe('NumberCoordDisplay', () => {
  it('Logs number displays', () => {
    const data: number[] = generateIntData(-323, 678, 100);

    const xMaxTicks = 10;
    const yMaxTicks = 20;

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
      maxTicks: xMaxTicks,
    });

    const yDisplay = new NumberCoordDisplay({
      axisType: 'y',
      data,
      plotRect,
      maxTicks: yMaxTicks,
    });

    console.log({
      xDisplay,
      yDisplay,
    });
  });
});
