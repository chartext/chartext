import { AxisType, TickInterval } from '@/axis/Axis.types';
import { CoordType } from '@/coord/Coord.types';
import { Rect } from '@/ChartLayout.types';

export type CoordDisplayProps<T extends CoordType> = {
  axisType: AxisType;
  data: T[];
  plotRect: Rect<number>;
  maxTicks: number;
};

export abstract class CoordDisplay<T extends CoordType> {
  readonly #data: T[];
  readonly #axisType: AxisType;
  readonly #valueToViewCoordCache: Map<T, number> = new Map<T, number>();

  constructor(props: CoordDisplayProps<T>) {
    this.#data = props.data;
    this.#axisType = props.axisType;
  }

  /**
   * https://stackoverflow.com/questions/8506881/nice-label-algorithm-for-charts-with-minimum-ticks/16363437#16363437
   */
  static niceNum(range: number, round: boolean) {
    const exponent = Math.floor(Math.log10(range));
    const fraction = range / 10 ** exponent;

    const tickInterval: TickInterval = (() => {
      if (round) {
        if (fraction < 1.5) return 1;
        if (fraction < 2) return 3;
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

  static roundedMinMax(
    min: number,
    max: number,
    maxTicks: number,
  ): [min: number, max: number, spacing: number] {
    const range = max - min;
    const niceRange = CoordDisplay.niceNum(range, false);
    const spacing = CoordDisplay.niceNum(niceRange / (maxTicks - 1), true);
    const niceMin = Math.floor(min / spacing) * spacing;
    const niceMax = Math.ceil(max / spacing) * spacing;

    return [niceMin, niceMax, spacing];
  }

  abstract toNumber(t: T): number;

  getViewCoord(t: T): number {
    return this.#valueToViewCoordCache.get(t) ?? -1;
  }

  resize(plotRect: Rect<number>): void {
    this.#valueToViewCoordCache.clear();
    this.#data.forEach((value: T) => {
      this.#valueToViewCoordCache.set(value, this.valueToViewCoord(value, plotRect));
    });
  }

  valueToViewCoord(t: T, plotRect: Rect<number>): number {
    const size =
      this.#axisType === 'x' ? plotRect.right - plotRect.left : plotRect.bottom - plotRect.top;
    const scale = size / (this.max + this.min * -1);
    const numberValue = this.toNumber(t);

    switch (this.#axisType) {
      case 'x':
        return Math.round(plotRect.left + Math.abs(numberValue - this.min) * scale);
      case 'y':
        return Math.round(plotRect.top + Math.abs(this.max - numberValue) * scale);
      default:
        throw new Error('Invalid axis type.', { cause: this.#axisType });
    }
  }

  abstract get max(): number;
  abstract get min(): number;
  abstract get spacing(): number;
}
