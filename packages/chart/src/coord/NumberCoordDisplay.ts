import { CoordDisplay, CoordDisplayProps } from '@/coord/CoordDisplay';

/**
 * @todo Chrome limitation Math.min and Math.max
 */
export class NumberCoordDisplay extends CoordDisplay<number> {
  #min: number;
  #max: number;
  #spacing: number;

  constructor(props: CoordDisplayProps<number>) {
    super(props);

    this.toNumber = this.toNumber.bind(this);

    const { data, maxTicks = 10 } = props;

    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);

    [this.#min, this.#max, this.#spacing] = CoordDisplay.roundedMinMax(
      minValue,
      maxValue,
      maxTicks,
    );

    this.resize(props.plotRect);
  }

  override toNumber(t: number): number {
    return t;
  }
  override get max(): number {
    return this.#max;
  }
  override get min(): number {
    return this.#min;
  }
  override get spacing(): number {
    return this.#spacing;
  }
}
