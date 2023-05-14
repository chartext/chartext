import { defaultNumberFormatter } from '@/ChartDefaults';
import { AxisTick, AxisTickLayout } from '@/axis/Axis.types';
import { CoordMinMax, NumberFormatter } from '@/coord/Coord.types';

export class NumberTickLayout implements AxisTickLayout<number> {
  readonly #min: number;
  readonly #max: number;
  readonly #ticks: AxisTick[] = [];

  constructor(
    values: number[] | CoordMinMax<number>,
    maxTicks: number,
    formatter?: NumberFormatter,
  ) {
    const min = Math.min(...values);
    const max = Math.max(...values);

    const { calcSpacing } = NumberTickLayout;

    const spacing = calcSpacing(min, max, maxTicks);
    const roundedMin = Math.floor(min / spacing) * spacing;
    const roundedMax = Math.ceil(max / spacing) * spacing;

    const numberFormatter = formatter ?? defaultNumberFormatter;

    for (let value = roundedMin; value <= roundedMax; value += spacing) {
      this.#ticks.push({
        plotValue: value,
        display: numberFormatter.format(value),
      });
    }

    this.#min = roundedMin;
    this.#max = roundedMax;
  }

  static calcSpacing(min: number, max: number, maxTicks: number): number {
    const { niceNum } = NumberTickLayout;

    const range = Math.abs(max - min);
    const niceRange = niceNum(range, false);

    return niceNum(niceRange / (maxTicks - 1), true);
  }

  /**
   * https://stackoverflow.com/questions/8506881/nice-label-algorithm-for-charts-with-minimum-ticks/16363437
   */
  protected static niceNum(range: number, round: boolean): number {
    const exponent = Math.floor(Math.log10(range));
    const fraction = range / 10 ** exponent;

    const tickInterval = (() => {
      if (round) {
        if (fraction < 1.5) return 1;
        if (fraction < 3) return 2;
        if (fraction < 7) return 5;
      } else {
        if (fraction <= 1) return 1;
        if (fraction <= 2) return 2;
        if (fraction <= 5) return 5;
      }
      return 10;
    })();

    return tickInterval * 10 ** exponent;
  }

  get min(): number {
    return this.#min;
  }

  get max(): number {
    return this.#max;
  }

  get ticks(): AxisTick[] {
    return this.#ticks;
  }
}
