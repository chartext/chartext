import { CoordType } from '@/coord/Coord.types';
import { Direction, RectLayout } from '@/layout/ChartLayout.types';

export abstract class CoordLayout<T extends CoordType> {
  readonly #label: string;
  readonly #min: T;
  readonly #max: T;
  readonly #ticks: T[];
  readonly #direction: Direction;

  protected constructor(
    label: string,
    min: T,
    max: T,
    ticks: T[],
    direction: Direction,
  ) {
    this.#label = label;
    this.#min = min;
    this.#max = max;
    this.#ticks = ticks;
    this.#direction = direction;
  }

  abstract format(value: T): string;
  protected abstract toNumber(value: T): number;

  getScreenCoord(value: T, seriesSurfaceRect: RectLayout): number {
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

  get label(): string {
    return this.#label;
  }

  get min(): T {
    return this.#min;
  }

  get max(): T {
    return this.#max;
  }

  get ticks(): T[] {
    return this.#ticks;
  }
}

export type XYCoordLayout = {
  xCoordLayout: CoordLayout<CoordType>;
  yCoordLayout: CoordLayout<CoordType>;
};
