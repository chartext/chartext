import { CoordLayout } from '@chartext/chart/coord/CoordLayout';

export class DateCoordLayout extends CoordLayout<Date> {
  protected override toSurfaceValue(value: Date): number {
    return value.getTime();
  }
}
