import { describe, it } from 'vitest';
import { generateNumberData } from '@chartext/utils';
import { CoordDisplay, NumberCoordDisplay, Rect } from '@chartext/chart';

describe('NumberCoordDisplay', () => {
  it.only('Logs number displays', () => {
    const data: number[] = generateNumberData(100, 'number');

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
