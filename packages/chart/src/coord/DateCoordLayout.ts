import { CoordLayout } from '@/coord/CoordLayout';

export class DateCoordLayout extends CoordLayout<Date> {
  protected override toSurfaceValue(value: Date): number {
    return value.getTime();
  }
}
