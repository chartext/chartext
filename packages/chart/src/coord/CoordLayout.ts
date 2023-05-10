import { AxisTickLayout } from '@/axis/Axis.types';
import { CoordFormatter, CoordType } from '@/coord/Coord.types';
import { Direction, RectLayout } from '@/layout/ChartLayout.types';

export abstract class CoordLayout<C extends CoordType = CoordType> {
  readonly #min: number;
  readonly #max: number;
  readonly #diff: number;
  readonly #direction: Direction;
  readonly #formatter: CoordFormatter<C>;

  constructor(
    axisTickLayout: AxisTickLayout<C>,
    direction: Direction,
    formatter: CoordFormatter<C>,
  ) {
    const { min, max } = axisTickLayout;

    this.#min = this.toSurfaceValue(min);
    this.#max = this.toSurfaceValue(max);

    this.#diff = Math.abs(this.#max - this.#min);
    this.#direction = direction;
    this.#formatter = formatter;
  }

  protected abstract toSurfaceValue(value: C): number;

  getSurfaceCoord(value: C | number, seriesSurfaceLayout: RectLayout): number {
    const plotValue =
      typeof value === 'number' ? value : this.toSurfaceValue(value);

    switch (this.#direction) {
      case 'horizontal': {
        const { x0, width } = seriesSurfaceLayout;
        const scale = width / this.#diff;

        return Math.round(x0 + Math.abs(plotValue - this.#min) * scale);
      }
      case 'vertical': {
        const { y0, height } = seriesSurfaceLayout;
        const scale = height / this.#diff;

        return Math.round(y0 + Math.abs(this.#max - plotValue) * scale);
      }
    }
  }

  get formatter(): CoordFormatter<C> {
    return this.#formatter;
  }
}
