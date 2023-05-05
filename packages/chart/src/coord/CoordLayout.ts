import { CoordFormatter, CoordType } from '@/coord/Coord.types';
import { Direction, RectLayout } from '@/layout/ChartLayout.types';

export abstract class CoordLayout<C extends CoordType> {
  readonly #min: C;
  readonly #max: C;
  readonly #ticks: C[];
  readonly #direction: Direction;
  readonly #formatter: CoordFormatter<C>;
  readonly #valueToScreenMap: Map<C, number> = new Map<C, number>();

  protected constructor(
    min: C,
    max: C,
    ticks: C[],
    direction: Direction,
    formatter: CoordFormatter<C>,
  ) {
    this.#min = min;
    this.#max = max;
    this.#ticks = ticks;
    this.#direction = direction;
    this.#formatter = formatter;
  }

  protected abstract toNumber(value: C): number;

  getScreenCoord(value: C, seriesSurfaceRect: RectLayout): number {
    return this.toScreenCoord(
      this.toNumber(value),
      this.toNumber(this.#min),
      this.toNumber(this.#max),
      seriesSurfaceRect,
    );
  }

  protected toScreenCoord(
    value: number,
    minValue: number,
    maxValue: number,
    seriesSurfaceRect: RectLayout,
  ): number {
    switch (this.#direction) {
      case 'horizontal': {
        const { left: seriesSurfaceLeft, right: seriesSurfaceRight } =
          seriesSurfaceRect;
        const seriesSurfaceWidth = seriesSurfaceRight - seriesSurfaceLeft;
        const diff = Math.abs(maxValue - minValue);
        const scale = seriesSurfaceWidth / diff;

        return Math.round(
          seriesSurfaceLeft + Math.abs(value - minValue) * scale,
        );
      }
      case 'vertical': {
        const { top: seriesSurfaceTop, bottom: seriesSurfaceBottom } =
          seriesSurfaceRect;
        const seriesSurfaceHeight = seriesSurfaceBottom - seriesSurfaceTop;
        const diff = Math.abs(maxValue - minValue);
        const scale = seriesSurfaceHeight / diff;

        return Math.round(
          seriesSurfaceTop + Math.abs(maxValue - value) * scale,
        );
      }
    }
  }

  get formatter(): CoordFormatter<C> {
    return this.#formatter;
  }

  get min(): C {
    return this.#min;
  }

  get max(): C {
    return this.#max;
  }

  get ticks(): C[] {
    return this.#ticks;
  }
}

export type XYCoordLayout<X extends CoordType, Y extends CoordType> = {
  xCoordLayout: CoordLayout<X>;
  yCoordLayout: CoordLayout<Y>;
};
