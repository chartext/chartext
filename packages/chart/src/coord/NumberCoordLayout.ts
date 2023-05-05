import { CoordFormatter } from '@/coord/Coord.types';
import { CoordLayout } from '@/coord/CoordLayout';
import { Direction } from '@/layout/ChartLayout.types';
import { numberTicks } from '@/utils/ticks';

export class NumberCoordLayout extends CoordLayout<number | bigint> {
  constructor(
    values: number[],
    maxTicks: number,
    direction: Direction,
    formatter?: CoordFormatter<number | bigint>,
  ) {
    const min = Math.min(...values);
    const max = Math.max(...values);

    const [roundedMin, roundedMax, spacing] = numberTicks(min, max, maxTicks);

    const ticks = [];

    for (let value = roundedMin; value <= roundedMax; value += spacing) {
      ticks.push(value);
    }

    super(
      roundedMin,
      roundedMax,
      ticks,
      direction,
      formatter ??
        new Intl.NumberFormat('en', {
          notation: 'compact',
        }),
    );
  }

  override toNumber(value: number): number {
    return value;
  }
}
