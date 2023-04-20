import { CoordDisplay, CoordDisplayProps } from '@/display/CoordDisplay';

export class NumberCoordDisplay extends CoordDisplay<number> {
  readonly min: number;

  readonly max: number;

  readonly spacing: number;

  constructor(props: CoordDisplayProps<number>) {
    super(props);

    this.toNumber = this.toNumber.bind(this);

    const { data, maxTicks = 10 } = props;

    const minValue = Math.min(...data);
    const maxValue = Math.max(...data);

    [this.min, this.max, this.spacing] = CoordDisplay.roundedMinMax(minValue, maxValue, maxTicks);

    this.resize(props.plotRect);
  }

  // eslint-disable-next-line class-methods-use-this
  override toNumber(t: number): number {
    return t;
  }
}
