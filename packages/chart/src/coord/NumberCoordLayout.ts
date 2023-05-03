import { CoordLayout } from '@/coord/CoordLayout';
import { Direction } from '@/layout/ChartLayout.types';
import { numberTicks } from '@/utils/ticks';

export class NumberCoordLayout extends CoordLayout<number> {
  constructor(values: number[], maxTicks: number, direction: Direction) {
    const min = Math.min(...values);
    const max = Math.max(...values);

    const [roundedMin, roundedMax, spacing] = numberTicks(min, max, maxTicks);

    const ticks = [];

    for (let value = roundedMin; value <= roundedMax; value += spacing) {
      ticks.push(value);
    }

    super(roundedMin, roundedMax, ticks, direction);
  }

  override toNumber(value: number): number {
    return value;
  }
}
