import { CoordLayout } from '@chartext/chart/coord/CoordLayout';

export class NumberCoordLayout extends CoordLayout<number> {
  override toSurfaceValue(value: number): number {
    return value;
  }
}
