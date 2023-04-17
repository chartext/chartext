import _ from 'lodash';
import { CoordDisplay, CoordDisplayProps } from '@/display/CoordDisplay';

export default class NumberCoordDisplay extends CoordDisplay<number> {
  readonly min: number;

  readonly max: number;

  readonly spacing: number;

  constructor(props: CoordDisplayProps<number>) {
    super(props);

    this.toNumber = this.toNumber.bind(this);

    const { data, maxTicks = 10 } = props;

    const minValue = _.min(data) ?? 0;
    const maxValue = _.max(data) ?? 0;

    [this.min, this.max, this.spacing] = CoordDisplay.roundedMinMax(minValue, maxValue, maxTicks);

    this.resize(props.plotRect);
  }

  // eslint-disable-next-line class-methods-use-this
  override toNumber(t: number): number {
    return t;
  }
}
