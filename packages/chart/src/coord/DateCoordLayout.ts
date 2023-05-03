import { max, min } from 'date-fns';
import { CoordLayout } from '@/coord/CoordLayout';
import { Direction } from '@/layout/ChartLayout.types';
import { dateTicks } from '@/utils/ticks';
import { addDatePart } from '@/utils/dates';
import { CoordProps } from '@/coord/Coord.types';

export class DateCoordLayout extends CoordLayout<Date> {
  override format(value: Date): string {
    throw new Error('Method not implemented.');
  }
  constructor(
    values: Date[],
    maxTicks: number,
    direction: Direction,
    coordProps?: CoordProps,
  ) {
    const minDate = min(values);
    const maxDate = max(values);

    const [roundedMin, roundedMax, spacing, datePart] = dateTicks(
      minDate,
      maxDate,
      maxTicks,
    );

    const ticks: Date[] = [];

    for (
      let tick = roundedMin;
      tick <= roundedMax;
      tick = addDatePart(tick, datePart, spacing)
    ) {
      ticks.push(tick);
    }

    const name = coordProps?.name ?? 'Date';
    super(name, roundedMin, roundedMax, ticks, direction);
  }

  protected override toNumber(value: Date): number {
    return value.getTime();
  }
}
