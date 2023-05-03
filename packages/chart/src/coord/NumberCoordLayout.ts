import { CoordProps } from '@/coord/Coord.types';
import { CoordLayout } from '@/coord/CoordLayout';
import { Direction } from '@/layout/ChartLayout.types';
import { numberTicks } from '@/utils/ticks';

export class NumberCoordLayout extends CoordLayout<number> {
  readonly #formatter: Intl.NumberFormat;

  constructor(
    values: number[],
    maxTicks: number,
    direction: Direction,
    coordProps?: CoordProps,
  ) {
    const min = Math.min(...values);
    const max = Math.max(...values);

    const [roundedMin, roundedMax, spacing] = numberTicks(min, max, maxTicks);

    const ticks = [];

    for (let value = roundedMin; value <= roundedMax; value += spacing) {
      ticks.push(value);
    }

    const name = coordProps?.name ?? 'Number';

    super(name, roundedMin, roundedMax, ticks, direction);

    this.#formatter = Intl.NumberFormat('en', {
      notation: 'compact',
    });
  }

  override format(value: number): string {
    return this.#formatter.format(value);
  }

  override toNumber(value: number): number {
    return value;
  }
}
