import { Rect } from '@/Chart.types';
import { AxisType, TickInterval } from '@/axis/Axis.types';
import { CoordType } from '@/series/Series.types';

export type CoordMeta = {
  viewCoord: number;
  value: CoordType;
  displayValue?: string;
};

export type CoordDisplayProps<T extends CoordType> = {
  axis: 'x' | 'y';
  data: T[];
  maxTicks?: number;
  // plotRect: Rect;
};

export abstract class CoordDisplay<T extends CoordType> {
  abstract readonly min: number;

  abstract readonly max: number;

  abstract readonly spacing: number;

  readonly data: T[];

  readonly axis: AxisType;

  // readonly plotRect: Rect;
  // readonly valueCoordCache: Map<number, number> = new Map();
  // readonly valueDisplayCache: Map<number, T> = new Map();
  // readonly rawData[];

  constructor(props: CoordDisplayProps<T>) {
    this.data = props.data;
    this.axis = props.axis;
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
    const range = Math.abs(min - max);
    const niceRange = CoordDisplay.niceNum(range, false);
    const spacing = CoordDisplay.niceNum(niceRange / (maxTicks - 1), true);
    const niceMin = Math.floor(min / spacing) * spacing;
    const niceMax = Math.ceil(max / spacing) * spacing;

    return [niceMin, niceMax, spacing];
  }

  abstract toRaw(t: T): number;

  toViewCoord(t: T, plotRect: Rect<number>): number {
    const { axis, min, max } = this;

    const size = axis === 'x' ? plotRect.right - plotRect.left : plotRect.bottom - plotRect.top;
    const scale = size / (max + min * -1);
    const rawValue = this.toRaw(t);

    switch (axis) {
      case 'x':
        return Math.round(plotRect.left + Math.abs(rawValue - min) * scale);
      case 'y':
        return Math.round(plotRect.top + Math.abs(max - rawValue) * scale);
      default:
        throw new Error('Invalid axis type.', { cause: { axis } });
    }
  }
}
