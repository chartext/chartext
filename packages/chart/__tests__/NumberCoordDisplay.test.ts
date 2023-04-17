import _ from 'lodash';
import { describe, it } from 'vitest';
import { generateNumberData } from '@/data/DummyData';
import { CoordDisplay } from '@/display/CoordDisplay';
import NumberCoordDisplay from '@/display/NumberCoordDisplay';
import { Rect } from '@/Chart.types';

describe('NumberCoordDisplay', () => {
  it.only('Logs number displays', () => {
    const data: number[] = generateNumberData(100, 'number');

    const minValue = _.min(data) ?? 0;
    const maxValue = _.max(data) ?? 0;

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
